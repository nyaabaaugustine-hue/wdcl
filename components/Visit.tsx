"use client";

import { FormEvent, useEffect, useState } from "react";
import Icon from "./Icon";
import { FACEBOOK_URL, MAP_URL, topics, ADDRESS, PLUS_CODE } from "@/lib/data";

type FieldErrors = { name?: string; email?: string; message?: string };

export default function Visit({ photo }: { photo?: string }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [topic, setTopic] = useState(topics[0]);

  // Deep links (e.g. /?topic=Volunteering#visit) preselect the topic.
  // Client-side navigation can settle the URL after mount, so retry briefly.
  useEffect(() => {
    function apply() {
      const t = new URLSearchParams(window.location.search).get("topic");
      if (t && (topics as readonly string[]).includes(t)) setTopic(t);
    }
    apply();
    const id = window.setTimeout(apply, 200);
    const id3 = window.setTimeout(apply, 1000);
    const onPop = () => apply();
    window.addEventListener("popstate", onPop);
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(id3);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    if (!message) next.message = "Please write a message.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(),
      );
      return;
    }

    // TODO: connect to an API route, email service or form provider.
    setSent(true);
    form.reset();
  }

async function copy(text: string, set: (v: boolean) => void) {
    try {
      await navigator.clipboard.writeText(text);
      set(true);
      setTimeout(() => set(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  }

  const errId = (k: keyof FieldErrors) => `err-${k}`;

  return (
    <section id="visit" className={`band${photo ? " visit-photo" : ""}`}>
      {photo ? (
        <div className="visit-bg" aria-hidden="true" style={{ backgroundImage: `url(${photo})` }} />
      ) : null}
      <div className="container contact">
        <div>
          <div className="heading">
            <p className="eyebrow">Visit us</p>
            <h2>Come in and explore.</h2>
            <p className="muted">Questions about the library, the clubs or partnerships? Send us a message.</p>
          </div>
          <div className="info info-grid">
            <div className="info-row wide">
              <Icon name="pin" size={16} />
              <div>
                <b>Location</b>
                <span>{ADDRESS}</span>
                <button type="button" className="linklike" onClick={() => copy(ADDRESS, setCopied)}>
                  {copied ? "Copied ✓" : "Copy address"}
                </button>
                <span role="status" className="sr-status">
                  {copied ? "Address copied to clipboard" : ""}
                </span>
              </div>
            </div>
            <div className="info-row">
              <Icon name="code" size={16} />
              <div>
                <b>Plus code</b>
                <span>{PLUS_CODE}</span>
                <button type="button" className="linklike" onClick={() => copy(PLUS_CODE, setCopiedCode)}>
                  {copiedCode ? "Copied ✓" : "Copy code"}
                </button>
                <span role="status" className="sr-status">
                  {copiedCode ? "Plus code copied to clipboard" : ""}
                </span>
              </div>
            </div>
            <div className="info-row">
              <Icon name="clock" size={16} />
              <div>
                <b>Opening hours</b>
                <span className="tbc" title="Not yet confirmed">
                  To be confirmed
                </span>
              </div>
            </div>
            <div className="info-row">
              <Icon name="phone" size={16} />
              <div>
                <b>Phone</b>
                <span className="tbc" title="Not yet confirmed">
                  To be added
                </span>
              </div>
            </div>
            <div className="info-row">
              <Icon name="mail" size={16} />
              <div>
                <b>Email</b>
                <span className="tbc" title="Not yet confirmed">
                  To be added
                </span>
              </div>
            </div>
            <div className="info-row wide">
              <Icon name="facebook" size={16} />
              <div>
                <b>Facebook</b>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                  Wiamoase Diaspora Public Library
                </a>
              </div>
            </div>
          </div>
        </div>

        <form className="card" onSubmit={onSubmit} noValidate>
          <div className="card-header">
            <h3 className="card-title">Send a message</h3>
            <p className="card-desc">We&apos;ll reply as soon as we can.</p>
          </div>
          <div className="card-content">
            <fieldset className="fieldset">
              <legend>About you</legend>
              <div className="row2">
                <div className="field">
                  <label htmlFor="n">Name</label>
                  <input
                    id="n"
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
                  <label htmlFor="e">Email</label>
                  <input
                    id="e"
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
              <legend>Topic</legend>
              <div className="topic-chips">
                {topics.map((t) => (
                  <label className="chip" key={t}>
                    <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="m">Message</label>
              <textarea
                id="m"
                name="message"
                required
                placeholder="How can we help?"
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
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <button className="btn btn-default btn-block" type="submit">
              Send message
            </button>
            <p className="form-note muted">
              We only use your details to reply — see the <a href="/privacy">privacy page</a>.
            </p>
            {sent && (
              <p role="status" className="form-success">
                <Icon name="check" size={16} />
                Thanks! This demo form is not connected yet, so nothing was sent.
              </p>
            )}
          </div>
        </form>
      </div>
      <div className="container">
        <div className="btn-row center visit-actions">
          <a className="btn btn-default btn-lg" href={MAP_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="pin" size={16} />
            Get directions
          </a>
          <a className="btn btn-outline btn-lg" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="facebook" size={16} />
            Message on Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
