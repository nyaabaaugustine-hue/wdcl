"use client";

import React from "react";
import Image from "next/image";

type PageHeroProps = {
  eyebrow: React.ReactNode;
  title: string;
  lead?: string;
  /** Photo behind the header. Leave out (and set `pattern`) to use the Wiamoase logo pattern instead. */
  image?: string;
  /** Use the green Wiamoase logo pattern as the background instead of a photo. */
  pattern?: boolean;
  /** Which logo pattern to use when `pattern` is on. */
  patternTone?: "green" | "cream";
  position?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  pattern = false,
  patternTone = "green",
  position = "center 40%",
  priority = false,
  children,
}: PageHeroProps) {
  return (
    <section className={`page-hero ph-img${pattern ? (patternTone === "cream" ? " ph-pattern ph-pattern-cream" : " ph-pattern") : ""}`}>
      {!pattern && image ? (
        <>
          <Image
            className="ph-photo"
            src={image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            style={{ objectPosition: position }}
          />
          <div className="ph-scrim" aria-hidden="true" />
        </>
      ) : null}
      <div className="container">
        <div className="kente-inline" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        {eyebrow}
        <h1>{title}</h1>
        {lead && <p className="lead muted">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
