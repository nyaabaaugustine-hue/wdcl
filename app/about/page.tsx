import type { Metadata } from "next";
import Overview from "@/components/Overview";
import Story from "@/components/Story";
import AboutVoices from "@/components/AboutVoices";
import Support from "@/components/Support";
import DirectorWelcome from "@/components/DirectorWelcome";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/data";

export const metadata: Metadata = {
  title: "About us | Wiamoase Diaspora Public Library",
  description:
    "Who built the Wiamoase Diaspora Public Library and why: a community library, learning centre and STEM hub in Agona Wiamoase, Ashanti Region, Ghana.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About us | Wiamoase Diaspora Public Library",
    description:
      "The story of a diaspora-built community library, learning centre and STEM hub in Agona Wiamoase, Ghana.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Who built this library."
        lead="The Wiamoase Diaspora Public Library was founded by Wiamoase citizens living abroad, and now serves the town and its students as a branch of the Ghana Library Authority."
        image={photo("photo-1481627834876-b7833e8f5570", 1600)}
        priority
      />
      <Overview />
      <Story />
      <DirectorWelcome />
      <AboutVoices />
      <Support />
    </>
  );
}