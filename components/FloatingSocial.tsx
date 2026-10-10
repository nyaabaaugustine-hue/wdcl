"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { FACEBOOK_URL } from "@/lib/data";

/**
 * Floating dock, bottom-right: back to top (appears after scrolling), a
 * "Message us" shortcut and the social profiles that actually exist.
 * Networks without a real profile URL are not shown. Add LinkedIn or
 * Instagram to `socials` once the real links are available.
 */
const socials = [
  { id: "facebook", label: "Facebook", href: FACEBOOK_URL, icon: "facebook" as const },
];

export default function FloatingSocial() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <div className="fab-dock">
      <button
        type="button"
        className={`fab-btn fab-top${showTop ? " is-visible" : ""}`}
        onClick={toTop}
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <Icon name="arrow" size={20} />
      </button>

      <nav className="fab-group" aria-label="Quick contact">
        <Link href="/contact" className="fab-btn fab-primary">
          <Icon name="mail" size={20} />
          <span className="fab-label">Message us</span>
        </Link>
        {socials.map((s) => (
          <a
            key={s.id}
            className={`fab-btn fab-${s.id}`}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name={s.icon} size={20} />
            <span className="fab-label">{s.label}</span>
            <span className="sr-status"> (opens in a new tab)</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
