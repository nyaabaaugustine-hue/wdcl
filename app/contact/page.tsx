import type { Metadata } from "next";
import Visit from "@/components/Visit";
import PageHero from "@/components/PageHero";
import { visitPhoto } from "@/lib/data";

const CONTACT_PHOTO =
  "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791290476/540452100_761460213416009_8447312575741898348_n_yo9ddu.jpg";

export const metadata: Metadata = {
  title: "Contact us | Wiamoase Diaspora Public Library",
  description:
    "Contact the Wiamoase Diaspora Public Library team about visiting, clubs, volunteering or partnerships.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact us | Wiamoase Diaspora Public Library",
    description:
      "Send a message to the team at the Wiamoase Diaspora Public Library in Agona Wiamoase, Ashanti Region.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Get in touch."
        lead="Questions about the library, the clubs or partnerships? Send us a message and we'll reply as soon as we can."
        image={visitPhoto}
        priority
      />
      <Visit photo={CONTACT_PHOTO} />
    </>
  );
}