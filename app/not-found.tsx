import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="kente-inline" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Not found</span>
        </nav>
        <h1>That page is not on the shelf.</h1>
        <p className="lead muted">
          The link may be old, or the address may be mistyped. Everything on the site is a click away from the front
          page.
        </p>
        <div className="btn-row center">
          <Link className="btn btn-default btn-lg" href="/">
            Back to the home page
          </Link>
          <Link className="btn btn-outline btn-lg" href="/news">
            Read the latest stories
          </Link>
        </div>
      </div>
    </section>
  );
}
