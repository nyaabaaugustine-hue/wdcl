import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/data";

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
        image={photo("photo-1507842217343-583bb7270b66", 1600)}
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