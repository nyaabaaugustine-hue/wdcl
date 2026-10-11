"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import { siteIndex, type SearchEntry } from "@/lib/siteIndex";

function scoreEntry(e: SearchEntry, tokens: string[]) {
  const title = e.title.toLowerCase();
  const rest = `${e.text} ${e.keywords ?? ""}`.toLowerCase();
  let total = 0;
  for (const t of tokens) {
    if (title.startsWith(t)) total += 6;
    else if (title.includes(t)) total += 4;
    else if (rest.includes(t)) total += 2;
    else return 0; // every word must match somewhere
  }
  return total;
}

/**
 * Site search. Opens from any element with [data-search], from "/" and from Ctrl/Cmd+K.
 * Searches the page list, clubs and news stories (lib/siteIndex.ts), entirely in the browser.
 */
export default function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return siteIndex.filter((e) => e.popular);
    return siteIndex
      .map((e) => ({ e, s: scoreEntry(e, tokens) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.e);
  }, [q]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const t = (e.target as Element | null)?.closest?.("[data-search]") as HTMLElement | null;
      if (!t) return;
      e.preventDefault();
      triggerRef.current = t;
      setOpen(true);
    }
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null;
      const typing = !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function close() {
    setOpen(false);
    setQ("");
    triggerRef.current?.focus();
  }

  function go(entry?: SearchEntry) {
    if (!entry) return;
    setOpen(false);
    setQ("");
    router.push(entry.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  }

  if (!open) return null;

  return (
    <div className="sr-root" onKeyDown={onKeyDown}>
      <div className="sr-backdrop" onClick={close} />
      <div className="sr-panel" role="dialog" aria-modal="true" aria-label="Search the website">
        <div className="sr-bar">
          <Icon name="search" size={20} />
          <input
            ref={inputRef}
            className="sr-input"
            type="search"
            placeholder="Search clubs, news, services…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            role="combobox"
            aria-expanded="true"
            aria-controls="sr-list"
            aria-activedescendant={results[active] ? `sr-opt-${active}` : undefined}
            aria-label="Search the website"
            autoComplete="off"
          />
          <button type="button" className="sr-close" onClick={close} aria-label="Close search">
            Esc
          </button>
        </div>

        {results.length ? (
          <>
            {!q.trim() ? <p className="sr-label">Popular pages</p> : null}
            <ul className="sr-list" id="sr-list" role="listbox" ref={listRef}>
              {results.map((r, i) => (
                <li
                  key={r.href}
                  id={`sr-opt-${i}`}
                  data-i={i}
                  role="option"
                  aria-selected={i === active}
                  className={`sr-item${i === active ? " active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                >
                  <span className="sr-kind">{r.kind}</span>
                  <b>{r.title}</b>
                  <span className="sr-text">{r.text}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="sr-empty">
            Nothing found for “{q}”. Try a different word, or{" "}
            <a href="/contact" data-dialog="visit" data-topic="Ask a librarian" onClick={() => setOpen(false)}>
              ask a librarian
            </a>
            .
          </p>
        )}

        <div className="sr-hint" aria-hidden="true">
          <span>↑ ↓ to move</span>
          <span>Enter to open</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
