"use client";

import { useState } from "react";
import Icon from "./Icon";
import { submitForm } from "@/lib/submitForm";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSending(true);
    const result = await submitForm({ kind: "newsletter", email: email.trim() });
    setSending(false);
    if (result.ok) setSent(true);
    else setError(result.message);
  }

  if (sent) {
    return (
      <p className="nl-done" role="status">
        <Icon name="check" size={15} />
        Thank you! We&apos;ve got your email and will send you news from the centre.
      </p>
    );
  }

  return (
    <form className="nl-form" onSubmit={onSubmit} noValidate>
      <label className="sr-only" htmlFor="nl-email">
        Email address
      </label>
      <input
        id="nl-email"
        type="email"
        name="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? "nl-error" : undefined}
      />
      <button className="btn btn-default" type="submit" disabled={sending} aria-busy={sending}>
        {sending ? "Sending…" : "Sign up"}
      </button>
      {error && (
        <span className="field-error nl-error" id="nl-error" role="alert">
          {error}
        </span>
      )}
    </form>
  );
}
