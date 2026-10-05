export default function Loading() {
  return (
    <div className="container route-loading" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="skeleton sk-hero" />
      <div className="skeleton sk-line" />
      <div className="skeleton sk-line short" />
      <div className="skeleton sk-block" />
    </div>
  );
}
