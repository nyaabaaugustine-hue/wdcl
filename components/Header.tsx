"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Icon from "./Icon";
import { navLinks, type NavLink } from "@/lib/data";

const LOGO_SRC =
  "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791212792/WIAMOASE_DIASPORA_PUBLIC_LIBRARY_-_Monochrome_Version_dcg8ge.png";

function isDark() {
  return document.documentElement.classList.contains("dark");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const [mGroup, setMGroup] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const triggersRef = useRef<Record<string, HTMLButtonElement | null>>({});

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

  // Mobile drawer: Escape closes, outside click closes, lock body scroll.
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

  // Desktop dropdown: Escape returns focus to its trigger, outside click closes.
  useEffect(() => {
    if (!drop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggersRef.current[drop]?.focus();
        setDrop(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setDrop(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [drop]);

  // Close the desktop dropdown on navigation.
  useEffect(() => setDrop(null), [pathname]);

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
    href.startsWith("/") &&
    !href.includes("#") &&
    (pathname === href || pathname.startsWith(`${href}/`));

  const groupIsActive = (l: NavLink) => !!l.children?.some((c) => isActive(c.href));

  function toggleGroup(l: NavLink) {
    setDrop((d) => (d === l.label ? null : l.label));
  }

  return (
    <header className="site" ref={headerRef}>
      <div className="container">
        <a href="/" className="logo" aria-label="Wiamoase Diaspora Library — home">
          <span className="logo-img">
            <Image src={LOGO_SRC} alt="" fill sizes="140px" priority />
          </span>
        </a>
        <nav className="main" aria-label="Primary">
          {navLinks.map((l) =>
            l.children ? (
              <div className={`menu-item${groupIsActive(l) ? " has-active" : ""}`} key={l.label}>
                <button
                  type="button"
                  className="nav-btn"
                  aria-haspopup="true"
                  aria-expanded={drop === l.label}
                  ref={(el) => {
                    triggersRef.current[l.label] = el;
                  }}
                  onClick={() => toggleGroup(l)}
                >
                  {l.label}
                  <span className="caret" aria-hidden="true">
                    <Icon name="chevron" size={14} />
                  </span>
                </button>
                {drop === l.label ? (
                  <div className="submenu">
                    {l.children.map((c) => (
                      <a key={c.href} href={c.href} role="menuitem" aria-current={isActive(c.href) ? "page" : undefined}>
                        {c.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <a key={l.label} href={l.href} aria-current={isActive(l.href ?? "") ? "page" : undefined}>
                {l.label}
              </a>
            ),
          )}
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
          <a
            href="/#visit"
            className="btn btn-default btn-sm hide-m"
            data-dialog="visit"
            data-topic={"Donations & partnerships"}
          >
            Donate Now
          </a>
          <button
            ref={burgerRef}
            className="btn btn-outline btn-icon burger"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              setDrop(null);
              setOpen((o) => !o);
            }}
          >
            <Icon name={open ? "check" : "menu"} size={18} />
          </button>
        </div>
      </div>
      <div className={`mobile${open ? " open" : ""}`} id="mobile-menu">
        {navLinks.map((l) =>
          l.children ? (
            <div className="m-group-wrap" key={l.label}>
              <button
                type="button"
                className="m-group"
                aria-expanded={mGroup === l.label}
                onClick={() => setMGroup((g) => (g === l.label ? null : l.label))}
              >
                {l.label}
                <span className="caret" aria-hidden="true">
                  <Icon name="chevron" size={16} />
                </span>
              </button>
              {mGroup === l.label ? (
                <div className="m-sub">
                  {l.children.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      aria-current={isActive(c.href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <a
              key={l.label}
              href={l.href}
              aria-current={isActive(l.href ?? "") ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ),
        )}
        <a
          href="/#visit"
          className="btn btn-default btn-join"
          data-dialog="visit"
          data-topic={"Donations & partnerships"}
          onClick={() => setOpen(false)}
        >
          Donate Now
        </a>
      </div>
    </header>
  );
}