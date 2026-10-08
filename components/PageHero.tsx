"use client";

import React from "react";
import Image from "next/image";

type PageHeroProps = {
  eyebrow: React.ReactNode;
  title: string;
  lead?: string;
  image: string;
  position?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  position = "center 40%",
  priority = false,
  children,
}: PageHeroProps) {
  return (
    <section className="page-hero ph-img">
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
