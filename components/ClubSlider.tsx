"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string };

const AUTOPLAY_MS = 5000;

/**
 * Moving photo slideshow for a club page: slow crossfade, gentle zoom, autoplay
 * that pauses on hover, focus or the pause button, arrows, dots and swipe.
 * It never autoplays for visitors who ask their device to reduce motion.
 */
export default function ClubSlider({ photos, label }: { photos: Slide[]; label: string }) {
  const count = photos.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((i: number) => setCurrent(((i % count) + count) % count), [count]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + count) % count), [count]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused || reduced) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [count, paused, reduced]);

  // warm the next photo so the crossfade never shows an empty frame
  useEffect(() => {
    if (count < 2) return;
    const img = new window.Image();
    img.src = photos[(current + 1) % count].src;
  }, [current, count, photos]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  }

  return (
    <div
      className="club-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Photos: ${label}`}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="cs-frame"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        }}
      >
        {photos.map((p, i) => (
          <figure
            key={p.src}
            className={`cs-slide${i === current ? " active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== current}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
              priority={i === 0}
              className="cs-img"
            />
          </figure>
        ))}

        {count > 1 ? (
          <>
            <button type="button" className="cs-arrow prev" onClick={prev} aria-label="Previous photo">
              &#8249;
            </button>
            <button type="button" className="cs-arrow next" onClick={next} aria-label="Next photo">
              &#8250;
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="cs-bar">
          <div className="cs-dots">
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                className="cs-dot"
                aria-label={`Show photo ${i + 1} of ${count}`}
                aria-current={i === current}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="cs-pause"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={paused}
          >
            {paused ? "▶" : "❚❚"}
          </button>
          <span className="cs-count" aria-hidden="true">
            {current + 1} / {count}
          </span>
        </div>
      ) : null}
    </div>
  );
}
