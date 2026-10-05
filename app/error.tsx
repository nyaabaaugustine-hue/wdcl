"use client";

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">Something went wrong</p>
        <h1>The page could not be loaded.</h1>
        <p className="lead muted">This is a temporary problem. Try again, or come back to the home page.</p>
        <div className="btn-row center">
          <button className="btn btn-default btn-lg" type="button" onClick={() => reset()}>
            Try again
          </button>
          <a className="btn btn-outline btn-lg" href="/">
            Back to the home page
          </a>
        </div>
      </div>
    </section>
  );
}
