"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { heroBackdropSlides } from "@/lib/data";

const SLIDE_MS = 6500;

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Decorative background crossfade behind the hero copy. Purely visual
 * (alt="" + aria-hidden), so no caption/subject claims are attached.
 */
export default function HeroBackdrop() {
  const count = heroBackdropSlides.length;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (count < 2 || reducedMotion()) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setCurrent((c) => (c + 1) % count);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <>
      {heroBackdropSlides.map((src, i) => (
        <Image
          key={src}
          className={`hero-bg hero-slide${i === current ? " active" : ""}`}
          src={src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "low" : "auto"}
        />
      ))}
    </>
  );
}
