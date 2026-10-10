import { NextResponse } from "next/server";

export const runtime = "nodejs";

/*
 * One endpoint for every form on the site (contact, visit, join, volunteer,
 * newsletter). It validates the request, drops bots (honeypot + rate limit)
 * and emails the library team through Resend's REST API.
 *
 * Set these environment variables (see .env.example):
 *   RESEND_API_KEY      API key from resend.com
 *   CONTACT_TO_EMAIL    where messages are delivered (the library's inbox)
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Library website <no-reply@your-domain.org>"
 */

const KIND_LABEL = {
  contact: "Website message",
  visit: "Visit request",
  join: "Club registration",
  volunteer: "Volunteer offer",
  newsletter: "Newsletter signup",
} as const;

type Kind = keyof typeof KIND_LABEL;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\r/g, "").trim().slice(0, max) : "";

const oneLine = (v: string) => v.replace(/\s+/g, " ").trim();

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function fail(status: number, message: string) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return fail(429, "Too many messages in a short time. Please wait a few minutes and try again.");
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "That request couldn't be read. Please try again.");
  }

  // Honeypot: bots fill the hidden field. Pretend it worked.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const kind = clean(body.kind, 20) as Kind;
  if (!(kind in KIND_LABEL)) return fail(400, "Unknown form.");

  const name = oneLine(clean(body.name, 120));
  const email = clean(body.email, 200);
  const topic = oneLine(clean(body.topic, 120));
  const message = clean(body.message, 4000);

  if (!EMAIL_RE.test(email)) return fail(400, "That email address doesn't look right.");
  if (kind !== "newsletter" && !name) return fail(400, "Please add your name.");
  if ((kind === "contact" || kind === "visit") && !message) return fail(400, "Please write a message.");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.warn("[api/contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set; nothing was sent.");
    return fail(
      503,
      "Sending isn't switched on yet. Please message us on Facebook in the meantime, and sorry for the trouble.",
    );
  }

  const label = KIND_LABEL[kind];
  const subject = oneLine(`${label}${topic ? `: ${topic}` : ""}${name ? ` (${name})` : ""}`).slice(0, 200);

  const rows: [string, string][] = [
    ["Form", label],
    ["Name", name || "—"],
    ["Email", email],
    ["Topic", topic || "—"],
    ["Message", message || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#6b6258;vertical-align:top;white-space:nowrap"><b>${escapeHtml(k)}</b></td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
    });
    if (!res.ok) {
      console.error("[api/contact] Resend rejected the email:", res.status, await res.text().catch(() => ""));
      return fail(502, "We couldn't send that just now. Please try again, or message us on Facebook.");
    }
  } catch (err) {
    console.error("[api/contact] Could not reach Resend:", err);
    return fail(502, "We couldn't send that just now. Please try again, or message us on Facebook.");
  }

  return NextResponse.json({ ok: true });
}
