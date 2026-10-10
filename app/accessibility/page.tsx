import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Accessibility | Wiamoase Diaspora Public Library",
  description:
    "What this website does to be usable by everyone, what we have not yet tested, and how to tell us about a barrier.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Accessibility</span>
          </nav>
        }
        title="A site everyone should be able to use."
        lead="The centre aims to include children with special needs from the town. The website should be as welcoming as the building."
        image={photo("accessibility-hero", 1600)}
      />

      <section className="section-tight">
        <div className="container prose">
          <h2>What we have built in</h2>
          <ul>
            <li>A &ldquo;skip to content&rdquo; link and a keyboard-friendly header, menus and dialogs.</li>
            <li>Visible focus outlines on links, buttons and form fields.</li>
            <li>Light and dark themes, with text colours checked for contrast.</li>
            <li>Respect for the &ldquo;reduce motion&rdquo; setting: auto-moving content stops if you ask for less motion.</li>
            <li>Touch targets sized for fingers, and layouts that work on small phone screens.</li>
          </ul>

          <h2>What we have not done yet</h2>
          <p>
            The site has not had an independent accessibility audit, and we do not claim formal conformance with any
            standard. Some images use general descriptions while their subjects are being written up properly.
          </p>

          <h2>Tell us about a barrier</h2>
          <p>
            If something is hard to read, reach or use, please <Link href="/contact">contact us</Link> and say what
            you were trying to do and what got in the way. We will fix it where we can and offer another way to get
            the information in the meantime.
          </p>
        </div>
      </section>
    </>
  );
}
