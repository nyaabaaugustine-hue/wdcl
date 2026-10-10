"use client";

import { useState } from "react";
import Icon from "./Icon";

type Props = { title: string };

function open(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function ShareRow({ title }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  }

  function shareTo(kind: "fb" | "x") {
    const u = encodeURIComponent(window.location.href);
    const t = encodeURIComponent(title);
    if (kind === "fb") open(`https://www.facebook.com/sharer/sharer.php?u=${u}`);
    if (kind === "x") open(`https://twitter.com/intent/tweet?url=${u}&text=${t}`);
  }

  return (
    <div className="share-row">
      <span className="share-label">
        <Icon name="share" size={15} />
        Share
      </span>
      <button type="button" className="chip" onClick={copyLink}>
        {copied ? "Link copied ✓" : "Copy link"}
      </button>
      <button type="button" className="chip" onClick={() => shareTo("fb")}>
        Facebook
      </button>
      <button type="button" className="chip" onClick={() => shareTo("x")}>
        X
      </button>
      <span role="status" className="sr-status share-status">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
