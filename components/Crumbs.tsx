import Link from "next/link";

/** Small breadcrumb used as the eyebrow of the page headers. */
export default function Crumbs({ current }: { current: string }) {
  return (
    <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <span aria-hidden="true">/</span>
      <span>{current}</span>
    </nav>
  );
}
