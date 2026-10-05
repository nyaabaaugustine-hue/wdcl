"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { heroPhotos } from "@/lib/data";

const AUTOPLAY_MS = 6000;

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Homepage photo slider. Uses next/image directly rather than <Photo> because
 * the slides must stack absolutely inside a single fixed-ratio frame, which the
 * figure-based <Photo> wrapper cannot express.
 */
export default function HeroSlider() {
  const count = heroPhotos.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (i: number) => setCurrent(((i % count) + count) % count),
    [count],
  );
  const prev = useCallback(() => setCurrent((c) => (c - 1 + count) % count), [count]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count]);

  useEffect(() => {
    if (paused || reducedMotion()) return;
    let t = setInterval(() => setCurrent((c) => (c + 1) % count), AUTOPLAY_MS);
    const onVis = () => {
      if (document.hidden) {
        clearInterval(t);
      } else {
        clearInterval(t);
        t = setInterval(() => setCurrent((c) => (c + 1) % count), AUTOPLAY_MS);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [paused, count]);

  // warm the next slide so the crossfade never flashes an empty frame
  useEffect(() => {
    const nextSrc = heroPhotos[(current + 1) % count].full;
    const img = new window.Image();
    img.src = nextSrc;
  }, [current, count]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  }

  const touchX = useRef(0);
  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  }

  return (
    <div
      className="hero-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photographs of the centre"
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hs-frame" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {heroPhotos.map((p, i) => (
          <figure
            key={p.full}
            className={`hs-slide${i === current ? " active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== current}
          >
            <Image
              src={p.full}
              alt={p.alt}
              fill
              sizes="(max-width: 900px) 100vw, 1152px"
              priority={i === 0}
              className="hs-img"
            />
            <figcaption className="hs-cap">{p.caption}</figcaption>
          </figure>
        ))}

        <button type="button" className="hs-arrow prev" onClick={prev} aria-label="Previous photo">
          &#8249;
        </button>
        <button type="button" className="hs-arrow next" onClick={next} aria-label="Next photo">
          &#8250;
        </button>
      </div>

      <div className="hs-bar">
        <div className="hs-dots">
          {heroPhotos.map((p, i) => (
            <button
              key={p.full}
              type="button"
              className="hs-dot"
              aria-label={`Show photo ${i + 1}: ${p.caption}`}
              aria-current={i === current}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="hs-pause"
          onClick={() => setPaused((v) => !v)}
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          aria-pressed={paused}
        >
          {paused ? "▶" : "❚❚"}
        </button>
        <span className="hs-count" aria-hidden="true">
          {current + 1} / {count}
        </span>
      </div>
    </div>
  );
}