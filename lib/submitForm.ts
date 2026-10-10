export type FormKind = "contact" | "visit" | "join" | "volunteer" | "newsletter";

export type SubmitPayload = {
  kind: FormKind;
  name?: string;
  email: string;
  topic?: string;
  message?: string;
  /** honeypot field: must stay empty for real visitors */
  website?: string;
};

export type SubmitResult = { ok: true } | { ok: false; message: string };

const FALLBACK = "Something went wrong. Please try again, or message us on Facebook.";

/** Sends a form to /api/contact and turns every outcome into a friendly result. */
export async function submitForm(payload: SubmitPayload): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => null)) as { message?: string } | null;
    return { ok: false, message: data?.message || FALLBACK };
  } catch {
    return { ok: false, message: "We couldn't reach the server. Check your connection and try again." };
  }
}
