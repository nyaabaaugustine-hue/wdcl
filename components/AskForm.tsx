"use client";

import { FormEvent, useState } from "react";
import Icon from "./Icon";
import { submitForm } from "@/lib/submitForm";

type Variant = "ask" | "book";
type Errors = { name?: string; email?: string; message?: string; title?: string };

const COPY: Record<Variant, { topic: string; button: string; placeholder: string; note: string; success: string }> = {
  ask: {
    topic: "Ask a librarian",
    button: "Send my question",
    placeholder: "What would you like to know?",
    note: "A librarian will reply to the email you give.",
    success: "Thank you! Your question has been sent. A librarian will reply as soon as they can.",
  },
  book: {
    topic: "Book request",
    button: "Request this book",
    placeholder: "Anything that helps us find it: edition, subject, school level…",
    note: "We will tell you if we have it, can get it, or can suggest something similar.",
    success: "Thank you! Your book request has been sent. We will reply as soon as we can.",
  },
};

/** One form for "Ask a librarian" and "Request a book". Posts to /api/contact. */
export default function AskForm({ variant = "ask" }: { variant?: Variant }) {
  const copy = COPY[variant];
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("website")) {
      setSent(true);
      return;
    }

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const note = String(fd.get("message") || "").trim();
    const title = String(fd.get("title") || "").trim();
    const author = String(fd.get("author") || "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please add your name.";
    if (!email) next.email = "Please add your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email address doesn’t look right.";
    if (variant === "book" && !title) next.title = "Please tell us the book’s title.";
    if (variant === "ask" && !note) next.message = "Please write your question.";

    setErrors(next);
    setSendError("");
    setSent(false);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    const message =
      variant === "book"
        ? [`Book title: ${title}`, author ? `Author: ${author}` : "", note ? `Notes: ${note}` : ""]
            .filter(Boolean)
            .join("\n")
        : note;

    setSending(true);
    const result = await submitForm({ kind: "contact", name, email, topic: copy.topic, message });
    setSending(false);
    if (result.ok) {
      setSent(true);
      form.reset();
    } else {
      setSendError(result.message);
    }
  }

  const id = (k: string) => `${variant}-${k}`;
  const err = (k: keyof Errors) => (errors[k] ? `${id(k)}-err` : undefined);

  return (
    <form className="card ask-form" onSubmit={onSubmit} noValidate>
      <div className="card-content">
        {variant === "book" ? (
          <div className="row2">
            <div className="field">
              <label htmlFor={id("title")}>Book title</label>
              <input
                id={id("title")}
                name="title"
                placeholder="e.g. Homegoing"
                aria-invalid={!!errors.title}
                aria-describedby={err("title")}
              />
              {errors.title && (
                <span className="field-error" id={id("title-err")}>
                  {errors.title}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor={id("author")}>
                Author <span className="muted">(optional)</span>
              </label>
              <input id={id("author")} name="author" placeholder="e.g. Yaa Gyasi" />
            </div>
          </div>
        ) : null}

        <div className="row2">
          <div className="field">
            <label htmlFor={id("name")}>Your name</label>
            <input
              id={id("name")}
              name="name"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={!!errors.name}
              aria-describedby={err("name")}
            />
            {errors.name && (
              <span className="field-error" id={id("name-err")}>
                {errors.name}
              </span>
            )}
          </div>
          <div className="field">
            <label htmlFor={id("email")}>Email</label>
            <input
              id={id("email")}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={err("email")}
            />
            {errors.email && (
              <span className="field-error" id={id("email-err")}>
                {errors.email}
              </span>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor={id("message")}>
            {variant === "book" ? "Notes" : "Your question"}
            {variant === "book" ? <span className="muted"> (optional)</span> : null}
          </label>
          <textarea
            id={id("message")}
            name="message"
            placeholder={copy.placeholder}
            aria-invalid={!!errors.message}
            aria-describedby={err("message")}
          />
          {errors.message && (
            <span className="field-error" id={id("message-err")}>
              {errors.message}
            </span>
          )}
        </div>

        <div className="hp" aria-hidden="true">
          <label htmlFor={id("website")}>Website</label>
          <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <button className="btn btn-default btn-block" type="submit" disabled={sending} aria-busy={sending}>
          {sending ? "Sending…" : copy.button}
        </button>
        <p className="form-note muted">
          {copy.note} We only use your details to reply: see the <a href="/privacy">privacy page</a>.
        </p>
        {sendError && (
          <p role="alert" className="form-error">
            {sendError}
          </p>
        )}
        {sent && (
          <p role="status" className="form-success">
            <Icon name="check" size={16} />
            {copy.success}
          </p>
        )}
      </div>
    </form>
  );
}
