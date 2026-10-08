"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <p className="nl-done" role="status">
        <Icon name="check" size={15} />
        You&apos;re on the list — this demo form is not connected to a mailing
        list yet, so nothing was actually sent.
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? "nl-error" : undefined}
      />
      <button className="btn btn-default" type="submit">
        Sign up
      </button>
      {error && (
        <span className="field-error nl-error" id="nl-error" role="alert">
          {error}
        </span>
      )}
    </form>
  );
}
