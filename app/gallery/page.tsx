import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery | Wiamoase Diaspora Public Library",
  description:
    "Photographs of the community library, Robotics & ICT Centre, clubs and conference facilities at Agona Wiamoase.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Gallery</span>
          </nav>
        }
        title="Inside the centre."
        lead="The reading room, the robotics bench, the clubs in session and the hall where the community meets."
        image="https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791466702/vv_z2zakh.jpg"
        priority
      />

      <section className="section-tight">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}