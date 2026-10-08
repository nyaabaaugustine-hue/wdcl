"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GoogleSummary, Stars } from "./GoogleReviews";
import { voices } from "@/lib/voices";

const ROTATE_MS = 7000;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (paused || hover || reduced) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setI((v) => (v + 1) % voices.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, hover, reduced, i]);

  const frozen = paused || hover || reduced;
  const go = (n: number) => setI((n + voices.length) % voices.length);
  const v = voices[i];

  return (
    <section id="voices">
      <div className="container">
        <div className="heading">
          <p className="eyebrow">In their words</p>
          <h2>What the community says.</h2>
          <p className="muted">
            Sample voices for layout only — real comments will be confirmed with members and visitors before
            publishing.
          </p>
        </div>
        <GoogleSummary />
        <div
          className="tl-rotor"
          data-paused={frozen ? "true" : "false"}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="kente-inline" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <Stars />
          <blockquote className="tl-big" aria-live="polite">
            “{v.quote}”
          </blockquote>
          <div className="tl-who-row">
            <span className="tl-av">
              <Image src={v.img} alt="" width={44} height={44} sizes="44px" />
            </span>
            <span className="tl-who">
              <b>Name to be added</b>
              <span>{v.role}</span>
            </span>
          </div>
          <div className="tl-controls">
            <button type="button" className="tl-arrow" aria-label="Previous voice" onClick={() => go(i - 1)}>
              ‹
            </button>
            <div className="tl-dots">
              {voices.map((voice, idx) => (
                <button
                  key={voice.role}
                  type="button"
                  className="tl-dot"
                  aria-current={idx === i ? "true" : undefined}
                  aria-label={`Voice ${idx + 1} of ${voices.length}: ${voice.role}`}
                  onClick={() => go(idx)}
                />
              ))}
            </div>
            <button type="button" className="tl-arrow" aria-label="Next voice" onClick={() => go(i + 1)}>
              ›
            </button>
            <button
              type="button"
              className="tl-pause"
              aria-pressed={paused}
              aria-label={paused ? "Resume rotation" : "Pause rotation"}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? "▶" : "❚❚"}
            </button>
          </div>
        </div>
        <p className="muted tl-note">No real testimonials are published yet — this is a placeholder layout.</p>
      </div>
    </section>
  );
}
