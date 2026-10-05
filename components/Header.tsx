"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { navLinks } from "@/lib/data";

function isDark() {
  return document.documentElement.classList.contains("dark");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDark(isDark());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {
        /* storage unavailable */
      }
      if (stored) return;
      document.documentElement.classList.toggle("dark", mq.matches);
      setDark(mq.matches);
    };
    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      document.body.style.overflow = "";
    };
  }, [open]);

  function toggleTheme() {
    const root = document.documentElement;
    root.classList.toggle("dark");
    const nowDark = isDark();
    setDark(nowDark);
    try {
      localStorage.setItem("theme", nowDark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }

  const isActive = (href: string) =>
    href.startsWith("/") && !href.includes("#") &&
    (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="site" ref={headerRef}>
      <div className="container">
        <a href="/" className="logo" aria-label="Wiamoase Diaspora Library — home">
          <i aria-hidden="true">W</i> Wiamoase Diaspora Library
        </a>
        <nav className="main" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="spacer" />
        <div className="nav-actions">
          <button
            className="btn btn-ghost btn-icon"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={dark}
            title={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            <Icon name={dark ? "sun" : "moon"} size={18} />
          </button>
          <a href="/#clubs" className="btn btn-default btn-sm hide-m">
            Join a club
          </a>
          <button
            ref={burgerRef}
            className="btn btn-outline btn-icon burger"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "check" : "menu"} size={18} />
          </button>
        </div>
      </div>
      <div className={`mobile${open ? " open" : ""}`} id="mobile-menu">
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a href="/#clubs" className="btn btn-default btn-join" onClick={() => setOpen(false)}>
          Join a club
        </a>
      </div>
    </header>
  );
}
