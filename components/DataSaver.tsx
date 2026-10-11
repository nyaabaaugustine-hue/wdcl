"use client";

import { useEffect, useState } from "react";

const KEY = "data-saver";

/**
 * Data saver switch for visitors on limited mobile data. When on, it turns off animation and
 * hides decorative photo and pattern backgrounds (see the html[data-saver] rules in globals.css).
 * It remembers the choice, and starts on by default if the device already asks to save data.
 */
export default function DataSaver() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      /* storage unavailable */
    }
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const initial = stored ? stored === "on" : !!conn?.saveData;
    setOn(initial);
    document.documentElement.dataset.saver = initial ? "on" : "off";
  }, []);

  function toggle() {
    const next = !on;
    setOn(next);
    document.documentElement.dataset.saver = next ? "on" : "off";
    try {
      localStorage.setItem(KEY, next ? "on" : "off");
    } catch {
      /* storage unavailable */
    }
  }

  return (
    <button
      type="button"
      className="saver-btn"
      onClick={toggle}
      aria-pressed={on}
      title="Turns off animation and decorative backgrounds to use less data"
    >
      Data saver: {on ? "on" : "off"}
    </button>
  );
}
