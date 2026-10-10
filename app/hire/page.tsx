import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { photo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hire the Hall | Wiamoase Diaspora Public Library",
  description:
    "The furnished conference centre at the Wiamoase Diaspora Public Library is available for meetings, workshops and community events. Hire income helps maintain the centre.",
};

const uses = [
  "Community meetings and town gatherings",
  "Workshops and training sessions",
  "School and association events",
  "Talks and presentations",
];

export default function HirePage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Hire the hall</span>
          </nav>
        }
        title="A hall for the community to meet in."
        lead="The furnished conference centre in the Learning Development Centre is available for meetings, workshops and events. Every booking helps maintain the centre."
        image={photo("hire-hero", 1600)}
        priority
      />

      <section className="section-tight">
        <div className="container">
          <div className="overview">
            <div>
              <div className="heading">
                <p className="eyebrow">What it suits</p>
                <h2>Good for gatherings of all kinds.</h2>
                <p className="muted">
                  The hall sits in the same two-storey building as the library and the Robotics &amp; ICT Centre in
                  Agona Wiamoase.
                </p>
              </div>
              <ul className="ticks">
                {uses.map((u) => (
                  <li key={u}>
                    <Icon name="check" />
                    <div>
                      <b>{u}</b>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="callout">
                <Icon name="clock" />
                <div>
                  <b>Rates, capacity and availability</b>
                  <span className="muted">
                    These have not been published yet. Send us your date, expected numbers and what you plan to run,
                    and the library team will reply with what is possible.
                  </span>
                </div>
              </div>
              <a className="btn btn-default btn-block u-mt16" href="/#visit" data-dialog="visit" data-topic="Hall hire">
                Enquire about hiring
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Why it matters</p>
              <h2>Hire income keeps the doors open.</h2>
              <p>
                The conference centre is one of the ways the library supports its own running costs. Prefer to give
                directly? See the other ways to support the centre.
              </p>
            </div>
            <div>
              <Link className="btn btn-lg" href="/donate">
                Support the centre
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
