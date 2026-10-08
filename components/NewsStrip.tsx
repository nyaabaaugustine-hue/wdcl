"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { newsPosts } from "@/lib/news";
import Photo from "./Photo";

const SLIDE_MS = 10000;
const items = newsPosts.slice(0, 5);

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function NewsStrip() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const [kbd, setKbd] = useState(false);
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (paused || hover || focusIn || reduced) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setI((v) => (v + 1) % items.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, hover, focusIn, reduced, i]);

  const frozen = paused || hover || focusIn || reduced;
  const go = (n: number) => setI((n + items.length) % items.length);

  return (
    <div
      id="latest"
      className="ns-wrap"
      aria-labelledby="news-strip-title"
      ref={sectionRef}
      onPointerDown={() => setKbd(false)}
      onKeyDown={(e) => {
        if (e.key === "Tab" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Home" || e.key === "End") {
          setKbd(true);
        }
      }}
      onFocusCapture={() => setFocusIn(kbd)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setFocusIn(false);
        }
      }}
    >
      <div className="ns">
        <div className="ns-head">
          <p className="eyebrow">Latest news</p>
          <h2 id="news-strip-title">Fresh from Wiamoase.</h2>
          <p className="muted">
            Five stories from the library and its programmes — they take turns
            every ten seconds.
          </p>
          <Link className="btn btn-outline u-mt16" href="/news">
            All stories
          </Link>
        </div>

        <div
          className="ns-stage"
          data-paused={frozen ? "true" : "false"}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {items.map((p, idx) => (
            <article
              key={p.id}
              className={`ns-item${idx === i ? " active" : ""}`}
              aria-hidden={idx === i ? undefined : true}
            >
              <Link
                href={`/news/${p.id}`}
                className="ns-media"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Photo
                  src={p.image}
                  alt=""
                  ratio="4-3"
                  sizes="(max-width: 900px) 92vw, 360px"
                />
              </Link>
              <div className="ns-body">
                <div className="post-meta">
                  <span className={`cat cat-${p.category.toLowerCase()}`}>
                    {p.category}
                  </span>
                  <time dateTime={p.date}>{fmt(p.date)}</time>
                  <span className="dot-sep" aria-hidden="true">
                    ·
                  </span>
                  <span>{p.readMinutes} min read</span>
                </div>
                <h3 className="ns-title">
                  <Link href={`/news/${p.id}`}>{p.title}</Link>
                </h3>
                <p className="ns-dek muted">{p.dek}</p>
                <Link className="read-more" href={`/news/${p.id}`}>
                  Read the story <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
          <div className="ns-progress" aria-hidden="true">
            <span key={i} />
          </div>
        </div>

        <div className="ns-bar">
          <div className="ns-dots">
            {items.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                className="ns-dot"
                aria-current={idx === i ? "true" : undefined}
                aria-label={`Story ${idx + 1} of ${items.length}: ${p.title}`}
                onClick={() => go(idx)}
              />
            ))}
          </div>
          <span className="ns-count" aria-hidden="true">
            {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <div className="ns-nav">
            <button
              type="button"
              className="ns-arrow"
              aria-label="Previous story"
              onClick={() => go(i - 1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="ns-pause"
              aria-pressed={paused}
              aria-label={paused ? "Resume auto-play" : "Pause auto-play"}
              onClick={() => setPaused((v) => !v)}
            >
              {paused ? "▶" : "❚❚"}
            </button>
            <button
              type="button"
              className="ns-arrow"
              aria-label="Next story"
              onClick={() => go(i + 1)}
            >
              ›
            </button>
          </div>
          {!paused && !reduced && (
            <span className="ns-live" aria-hidden="true">
              <i /> every 10s
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
