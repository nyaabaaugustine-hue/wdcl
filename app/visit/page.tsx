import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import Facilities from "@/components/Facilities";
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
    icon: "heart",
    label: "Google rating",
    value: "4.7 stars from 3 Google reviews",
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
      <section className="page-hero vh-hero">
        <Image
          className="vh-photo"
          src={visitPhoto}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          loading="eager"
          priority
        />
        <div className="vh-scrim" aria-hidden="true" />
        <div className="container">
          <div className="kente-inline" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p className="eyebrow">
            <a href="/">Home</a> / Plan your visit
          </p>
          <h1>Come and see the centre.</h1>
          <p className="lead muted">
            The library, the Robotics &amp; ICT Centre and the conference hall
            all live under one roof in Agona Wiamoase. Here is everything you
            need before you set off.
          </p>
        </div>
      </section>

      <section className="vh-facts">
        <div className="container">
          <div className="vh-facts-grid">
            {facts.map((f) => (
              <div className="card vh-fact" key={f.label}>
                <span className="icon-box">
                  <Icon name={f.icon} />
                </span>
                <b>{f.label}</b>
                <span>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Facilities />

      <section className="vh-notes">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Before you come</p>
            <h2>Good to know.</h2>
          </div>
          <ul className="vh-list">
            {notes.map((n) => (
              <li key={n}>
                <span className="vh-check" aria-hidden="true">
                  <Icon name="check" size={14} />
                </span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vh-loc">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Getting here</p>
            <h2>Find us in Agona Wiamoase.</h2>
            <p className="muted">
              In the Ashanti Region of Ghana. The plus code
              <b> {PLUS_CODE}</b> works anywhere on Google Maps.
            </p>
          </div>
          <div className="vh-loc-grid">
            <iframe
              className="vh-map"
              src={`${MAP_URL}&output=embed`}
              title="Map showing the Wiamoase Diaspora Public Library in Agona Wiamoase"
              loading="lazy"
              allowFullScreen
            />
            <div className="card vh-loc-card">
              <h3>Open in Maps</h3>
              <p className="muted">
                Drop the plus code into Google Maps for turn-by-turn directions
                from anywhere in Ghana.
              </p>
              <div className="vh-links">
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
                <a
                  className="btn btn-outline"
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="facebook" size={16} />
                  Message on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Visit photo={visitPhoto} />
    </>
  );
}
