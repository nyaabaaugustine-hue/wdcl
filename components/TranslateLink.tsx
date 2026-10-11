"use client";

/**
 * Opens the current page in Google Translate, translated into Twi (Akan).
 * This is machine translation, so it is offered as a convenience, not as official wording.
 * It works once the site is live on a public address (not on localhost).
 */
export default function TranslateLink() {
  return (
    <a
      href="https://translate.google.com/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        const url = `https://translate.google.com/translate?sl=en&tl=ak&u=${encodeURIComponent(window.location.href)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }}
      title="Opens Google Translate. Machine translation, so wording may not be exact."
    >
      Read this page in Twi
    </a>
  );
}
