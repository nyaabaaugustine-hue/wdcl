"use client";

import { useState } from "react";

/** Small copy-to-clipboard button for sharing a page link. */
export default function CopyLink({ className = "back-top" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={copy}>
        {copied ? "Link copied ✓" : "Copy link"}
      </button>
      <span role="status" className="sr-status">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </>
  );
}
