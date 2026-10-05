import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | Wiamoase Diaspora Public Library",
  description:
    "Photographs of the community library, Robotics & ICT Centre, clubs and conference facilities at Agona Wiamoase.",
};

export default function GalleryPage() {
  return (
    <>
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
            <span>Gallery</span>
          </nav>
          <h1>Inside the centre.</h1>
          <p className="lead muted">
            The reading room, the robotics bench, the clubs in session and the hall where the community meets.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}