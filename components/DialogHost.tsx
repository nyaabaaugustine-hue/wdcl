"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { clubs, topics, volunteerRoles } from "@/lib/data";
import { submitForm } from "@/lib/submitForm";

type DialogKind = "visit" | "join" | "volunteer";

const META: Record<
  DialogKind,
  { eyebrow: string; title: string; sub: string; submit: string }
> = {
  visit: {
    eyebrow: "Visit us",
    title: "Plan your visit.",
    sub: "Tell us when you're coming and what you'd like to see — we'll be ready for you.",
    submit: "Send request",
  },
  join: {
    eyebrow: "Join a club",
    title: "Join a club.",
    sub: "Register your interest and the team will confirm a place for you.",
    submit: "Register interest",
  },
  volunteer: {
    eyebrow: "Volunteer",
    title: "Become a volunteer.",
    sub: "Two hours a week is enough. Tell us where you'd like to help.",
    submit: "Offer to help",
  },
};

type FieldErrors = { name?: string; email?: string; message?: string };

function DialogForm({
  kind,
  club,
  topic,
  onClose,
}: {
  kind: DialogKind;
  club?: string;
  topic?: string;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [who, setWho] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [topicValue, setTopicValue] = useState(
    kind === "join"
      ? club ?? clubs[0].title
      : kind === "volunteer"
        ? volunteerRoles[0].title
        : topic ?? topics[0],
  );
  const meta = META[kind];
  const options: string[] =
    kind === "join"
      ? clubs.map((c) => c.title)
      : kind === "volunteer"
        ? volunteerRoles.map((r) => r.title)
        : [...topics];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    // honeypot: real people never fill this in
    if (fd.get("website")) {
      setSent(true);
      return;
    }

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const next: FieldErrors = {};
    if (!name) next.name = "Please add your name.";
    if (!email) next.email = "Please add your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email address doesn’t look right.";
    if (kind === "visit" && !message) next.message = "Please write a message.";

    setErrors(next);
    setSendError("");
    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(),
      );
      return;
    }

    setSending(true);
    const result = await submitForm({ kind, name, email, topic: topicValue, message });
    setSending(false);

    if (result.ok) {
      setWho(name.split(" ")[0]);
      setSent(true);
    } else {
      setSendError(result.message);
    }
  }

  const errId = (k: keyof FieldErrors) => `derr-${k}`;

  if (sent) {
    return (
      <div className="card-content">
        <div className="dlg-done">
          <span className="dlg-done-icon" aria-hidden="true">
            <Icon name="check" size={26} />
          </span>
          <h3>
            Thanks{who ? `, ${who}` : ""}!
          </h3>
          <p className="muted">
            {kind === "join"
              ? "Your registration of interest has been sent to the library team."
              : kind === "volunteer"
                ? "Your offer to help has been sent to the library team."
                : "Your visit request has been sent to the library team."}{" "}
            They will reply to the email address you gave.
          </p>
          <p className="dlg-done-fine muted">
            We only use your details to reply — see the{" "}
            <a href="/privacy">privacy page</a>.
          </p>
          <div className="btn-row center">
            <button type="button" className="btn btn-default" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-outline" onClick={() => setSent(false)}>
              Send another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="card-content">
        <fieldset className="fieldset">
          <legend>About you</legend>
          <div className="row2">
            <div className="field">
              <label htmlFor="d-name">Name</label>
              <input
                id="d-name"
                name="name"
                required
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? errId("name") : undefined}
              />
              {errors.name && (
                <span className="field-error" id={errId("name")}>
                  {errors.name}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="d-email">Email</label>
              <input
                id="d-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? errId("email") : undefined}
              />
              {errors.email && (
                <span className="field-error" id={errId("email")}>
                  {errors.email}
                </span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className="fieldset topic-field">
          <legend>{kind === "volunteer" ? "Role" : kind === "join" ? "Club" : "Topic"}</legend>
          <div className="topic-chips">
            {options.map((o) => (
              <label className="chip" key={o}>
                <input
                  type="radio"
                  name="topic"
                  value={o}
                  checked={topicValue === o}
                  onChange={() => setTopicValue(o)}
                />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="d-message">
            Message{kind === "visit" ? "" : <span className="muted"> (optional)</span>}
          </label>
          <textarea
            id="d-message"
            name="message"
            required={kind === "visit"}
            placeholder={
              kind === "visit"
                ? "How can we help?"
                : kind === "join"
                  ? "Anything the team should know?"
                  : "Hours you can give, and when."
            }
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? errId("message") : undefined}
          />
          {errors.message && (
            <span className="field-error" id={errId("message")}>
              {errors.message}
            </span>
          )}
        </div>

        {/* honeypot — hidden from people and assistive tech */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="d-website">Website</label>
          <input id="d-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <button className="btn btn-default btn-block" type="submit" disabled={sending} aria-busy={sending}>
          {sending ? "Sending…" : meta.submit}
        </button>
        {sendError && (
          <p role="alert" className="form-error">
            {sendError}
          </p>
        )}
      </div>
    </form>
  );
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function DialogHost() {
  const [kind, setKind] = useState<DialogKind | null>(null);
  const [club, setClub] = useState<string | undefined>();
  const [topic, setTopic] = useState<string | undefined>();
  const [ready, setReady] = useState(false);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Delegated trigger handling: any element with [data-dialog] opens its form.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const trigger = (e.target as Element | null)?.closest?.("[data-dialog]") as HTMLElement | null;
      if (!trigger) return;
      const k = trigger.dataset.dialog;
      if (k !== "visit" && k !== "join" && k !== "volunteer") return;
      e.preventDefault();
      window.clearTimeout(closeTimer.current);
      triggerRef.current = trigger;
      setClub(trigger.dataset.club);
      setTopic(trigger.dataset.topic);
      setClosing(false);
      setReady(false);
      setKind(k);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Mount: scroll lock + animate in + move focus into the dialog.
  useEffect(() => {
    if (!kind) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setReady(true)),
    );
    document.body.style.overflow = "hidden";
    const focusId = window.setTimeout(() => panelRef.current?.focus(), 80);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(focusId);
      document.body.style.overflow = "";
    };
  }, [kind]);

  function close() {
    if (!kind || closing) return;
    setReady(false);
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setKind(null);
      setClosing(false);
      triggerRef.current?.focus();
    }, 200);
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const nodes = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null,
    );
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (!panel.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (!kind) return null;
  const meta = META[kind];

  return (
    <div
      className={`dlg-root${ready ? " open" : ""}${closing ? " closing" : ""}`}
      onKeyDown={onKeyDown}
    >
      <div className="dlg-backdrop" onClick={close} />
      <div
        className="dlg-panel card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dlg-title"
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="dlg-head">
          <div>
            <p className="eyebrow">{meta.eyebrow}</p>
            <h2 id="dlg-title">{meta.title}</h2>
            <p className="muted dlg-sub">{meta.sub}</p>
          </div>
          <button type="button" className="dlg-x" aria-label="Close dialog" onClick={close}>
            ×
          </button>
        </div>
        <DialogForm
          key={`${kind}-${club ?? ""}-${topic ?? ""}`}
          kind={kind}
          club={club}
          topic={topic}
          onClose={close}
        />
      </div>
    </div>
  );
}
