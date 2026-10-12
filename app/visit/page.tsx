import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Facilities from "@/components/Facilities";
import PageHero from "@/components/PageHero";
import Visit from "@/components/Visit";
import {
  ADDRESS,
  FACEBOOK_URL,
  MAP_URL,
  PLUS_CODE,
  visitPhoto,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Visit the library | Wiamoase Diaspora Public Library",
  description:
    "Plan a visit to the Wiamoase Diaspora Public Library in Agona Wiamoase — address, plus code, opening hours, facilities and directions.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Visit the library | Wiamoase Diaspora Public Library",
    description:
      "Address, plus code, opening hours and directions for the Wiamoase Diaspora Public Library in Agona Wiamoase, Ashanti Region.",
    type: "website",
  },
};

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=7.067%2C-1.533";

const facts = [
  { icon: "pin", label: "Where", value: ADDRESS },
  { icon: "code", label: "Plus code", value: PLUS_CODE },
  {
    icon: "clock",
    label: "Opening hours",
    value: "To be confirmed — message before you travel",
  },
  {
    icon: "users",
    label: "Clubs",
    value: "Free to join. Days and times are on each club page",
  },
] as const;

const notes = [
  "Opening hours are still being confirmed — send a message before you make a long trip.",
  "Save the plus code to your phone. Drivers can navigate to it with Google Maps, even without a street address.",
  "Clubs and programmes run on the days listed on each club page — check the clubs section first.",
  "When you arrive, staff at the desk will show you around the library, the STEM lab and the hall.",
];

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Plan your visit</span>
          </nav>
        }
        title="Come and see the centre."
        lead="The library, the Robotics & ICT Centre and the conference hall all live under one roof in Agona Wiamoase. Here is everything you need before you set off."
        image={visitPhoto}
        priority
      >
        <div className="vp-cta">
          <a
            className="btn btn-default btn-lg"
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="pin" size={16} />
            Get directions
          </a>
          <a
            className="btn btn-outline btn-lg"
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="facebook" size={16} />
            Message on Facebook
          </a>
        </div>
      </PageHero>

      <section id="visit-facts" className="vp-facts" aria-label="Visit at a glance">
        <div className="container">
          <ul className="vp-facts-grid">
            {facts.map((f) => (
              <li className="vp-fact" key={f.label}>
                <span className="vp-fact-icon" aria-hidden="true">
                  <Icon name={f.icon} />
                </span>
                <b>{f.label}</b>
                <span>{f.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vp-tips">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Before you come</p>
            <h2>Good to know.</h2>
            <p className="muted">Four things that will make your trip smoother.</p>
          </div>
          <ol className="vp-tips-grid">
            {notes.map((n) => (
              <li className="vp-tip" key={n}>
                <span>{n}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Facilities />

      <section className="vp-loc">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Getting here</p>
            <h2>Find us in Agona Wiamoase.</h2>
            <p className="muted">
              In the Ashanti Region of Ghana. The plus code works anywhere on
              Google Maps, even where there is no street address.
            </p>
          </div>
          <div id="visit-map" className="vp-loc-grid">
            <iframe
              className="vp-map"
              src={`${MAP_URL}&output=embed`}
              title="Map showing the Wiamoase Diaspora Public Library in Agona Wiamoase"
              loading="lazy"
              allowFullScreen
            />
            <div className="card vp-loc-card">
              <h3>Open in Maps</h3>
              <p className="muted">
                Type the plus code into Google Maps for turn-by-turn directions
                from anywhere in Ghana.
              </p>
              <span className="vp-code">
                <Icon name="code" size={16} />
                {PLUS_CODE}
              </span>
              <div className="vp-links">
                <a
                  className="btn btn-default"
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="arrow" size={16} />
                  Get directions
                </a>
                <a
                  className="btn btn-outline"
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="pin" size={16} />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Visit photo={visitPhoto} showInfo={false} />
    </>
  );
}
