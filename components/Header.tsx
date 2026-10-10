"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { navLinks, type NavLink } from "@/lib/data";

const LOGO_SRC =
  "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791212792/WIAMOASE_DIASPORA_PUBLIC_LIBRARY_-_Monochrome_Version_dcg8ge.png";

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

function isDark() {
  return document.documentElement.classList.contains("dark");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const [mGroup, setMGroup] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const triggersRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const pendingFocus = useRef<"first" | "last" | null>(null);

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

  // Subtle depth once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  // Keyboard support for desktop dropdowns (ArrowUp/Down, Home/End, Tab out).
  function menuItems(label: string) {
    return Array.from(
      headerRef.current?.querySelectorAll<HTMLAnchorElement>(`#submenu-${slug(label)} a`) ?? [],
    );
  }

  useEffect(() => {
    if (!drop || !pendingFocus.current) return;
    const els = menuItems(drop);
    (pendingFocus.current === "last" ? els[els.length - 1] : els[0])?.focus();
    pendingFocus.current = null;
  }, [drop]);

  function onTriggerKey(e: ReactKeyboardEvent<HTMLButtonElement>, l: NavLink) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const where = e.key === "ArrowDown" ? "first" : "last";
    if (drop === l.label) {
      const els = menuItems(l.label);
      (where === "last" ? els[els.length - 1] : els[0])?.focus();
    } else {
      pendingFocus.current = where;
      setDrop(l.label);
    }
  }

  function onMenuKey(e: ReactKeyboardEvent<HTMLDivElement>, l: NavLink) {
    const els = menuItems(l.label);
    if (!els.length) return;
    const i = els.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      els[(i + 1) % els.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      els[(i - 1 + els.length) % els.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      els[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      els[els.length - 1]?.focus();
    } else if (e.key === "Tab" && !e.shiftKey && i === els.length - 1) {
      setDrop(null);
    }
  }

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
    <header className={`site${scrolled ? " scrolled" : ""}`} ref={headerRef}>
      <div className="container">
        <Link href="/" className="logo" aria-label="Wiamoase Diaspora Library — home">
          <span className="logo-img">
            <Image src={LOGO_SRC} alt="" fill sizes="140px" priority />
          </span>
        </Link>
        <nav className="main" aria-label="Primary">
          {navLinks.map((l) =>
            l.children ? (
              <div className={`menu-item${groupIsActive(l) ? " has-active" : ""}`} key={l.label}>
                <button
                  type="button"
                  className="nav-btn"
                  aria-expanded={drop === l.label}
                  aria-controls={`submenu-${slug(l.label)}`}
                  ref={(el) => {
                    triggersRef.current[l.label] = el;
                  }}
                  onClick={() => toggleGroup(l)}
                  onKeyDown={(e) => onTriggerKey(e, l)}
                >
                  {l.label}
                  <span className="caret" aria-hidden="true">
                    <Icon name="chevron" size={14} />
                  </span>
                </button>
                {drop === l.label ? (
                  <div className="submenu" id={`submenu-${slug(l.label)}`} onKeyDown={(e) => onMenuKey(e, l)}>
                    {l.children.map((c) => (
                      <Link key={c.href} href={c.href} aria-current={isActive(c.href) ? "page" : undefined}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link key={l.label} href={l.href ?? "/"} aria-current={isActive(l.href ?? "") ? "page" : undefined}>
                {l.label}
              </Link>
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
          <Link href="/donate" className="btn btn-default btn-sm hide-m">
            Support the centre
          </Link>
          <button
            ref={burgerRef}
            className="btn btn-outline btn-icon burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              setDrop(null);
              setOpen((o) => !o);
            }}
          >
            <Icon name={open ? "close" : "menu"} size={18} />
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
                    <Link
                      key={c.href}
                      href={c.href}
                      aria-current={isActive(c.href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              key={l.label}
              href={l.href ?? "/"}
              aria-current={isActive(l.href ?? "") ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ),
        )}
        <Link href="/donate" className="btn btn-default btn-join" onClick={() => setOpen(false)}>
          Support the centre
        </Link>
      </div>
    </header>
  );
}
