"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "@/components/Photo";
import { galleryImages, type GalleryImage } from "@/lib/data";

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function GalleryGrid() {
  const [active, setActive] = useState<GalleryImage | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setActive(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((current) => {
        if (!current) return current;
        const i = galleryImages.findIndex((g) => g.src === current.src);
        return galleryImages[(i + dir + galleryImages.length) % galleryImages.length];
      });
    },
    []
  );

  useEffect(() => {
    // Closing: hand focus back to the thumbnail that opened the lightbox.
    if (!active) {
      triggerRef.current?.focus();
      return;
    }

    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowRight") {
        step(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        step(-1);
        return;
      }
      // Keep Tab inside the dialog so focus cannot escape behind the overlay.
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, step]);

  return (
    <>
      <ul className="gallery-grid">
        {galleryImages.map((g) => (
          <li key={g.src}>
            <button
              type="button"
              className="group gallery-btn"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setActive(g);
              }}
            >
              <Photo src={g.src} alt={g.alt} ratio="4-3" sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              <span className="gallery-meta">
                <span className="badge badge-secondary">{g.tag}</span>
                <span className="gallery-cap">{g.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          aria-describedby="lightbox-cap"
          ref={dialogRef}
          onClick={close}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lightbox-img" src={active.full} alt={active.alt} />
          <p className="lightbox-cap" id="lightbox-cap">
            {active.caption}
          </p>
          <p className="lightbox-count" aria-hidden="true">
            {galleryImages.findIndex((g) => g.src === active.src) + 1} / {galleryImages.length}
          </p>
          <button type="button" className="lightbox-btn prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image">
            &#8249;
          </button>
          <button type="button" className="lightbox-btn next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image">
            &#8250;
          </button>
          <button type="button" className="lightbox-close" onClick={close} aria-label="Close" ref={closeRef}>
            &#10005;
          </button>
        </div>
      ) : null}
    </>
  );
}