import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import ClubsCards from "@/components/ClubsCards";
import { ashantiCodes, clubs, stemLab, photo } from "@/lib/data";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Clubs & Programmes | Wiamoase Diaspora Public Library",
  description:
    "Coding, Robotics and Reading clubs at the Wiamoase Diaspora Public Library, plus the MTN-funded Integrated STEM Lab and Telecel's Ashanti Codes programme.",
};

export default function ClubsPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Clubs &amp; programmes</span>
          </nav>
        }
        title="Three clubs, and the partners who make them possible."
        lead="The clubs run through the week at the centre. The STEM Lab and Ashanti Codes are funded and delivered with external partners. Everything here is free to join."
        image={photo("photo-1485827404703-89b55fcc595e", 1600)}
        priority
      />

      <section className="section-tight">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Weekly clubs</p>
            <h2>Pick a club.</h2>
            <p className="muted">
              Every club is beginner-friendly and needs no prior experience. Open a club for its full description,
              session times and what members actually do.
            </p>
          </div>

          <ClubsCards bare />
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="overview">
            <div>
              <div className="heading">
                <p className="eyebrow">Partner-funded</p>
                <h2>The Integrated STEM Lab.</h2>
                <p className="muted">
                  The Robotics &amp; ICT Centre is not self-funded. It was equipped by the {stemLab.funder} at a
                  reported {stemLab.reportedValue}, commissioned on {stemLab.commissioned}.{" "}
                  {stemLab.distinction}.
                </p>
              </div>
              <ul className="ticks">
                {stemLab.equipment.map((e) => (
                  <li key={e.name}>
                    <Icon name="check" />
                    <div>
                      <b>{e.name}</b>
                      <span className="muted">{e.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <figure className="quote">
                <blockquote>{stemLab.quote.text}</blockquote>
                <figcaption className="muted">{stemLab.quote.attribution}</figcaption>
              </figure>
            </div>
            <div>
              <Photo
                src={clubs[1].image}
                alt={clubs[1].imageAlt}
                caption="Robotics & ICT Centre"
                ratio="4-3"
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="overview">
            <div>
              <div className="heading">
                <p className="eyebrow">Weekend programme</p>
                <h2>{ashantiCodes.name}.</h2>
                <p className="muted">
                  An initiative of the {ashantiCodes.funder} under its {ashantiCodes.pillar} pillar, delivered in
                  partnership with {ashantiCodes.partners} and supported by {ashantiCodes.supporter}. It runs as{" "}
                  {ashantiCodes.format.toLowerCase()} across {ashantiCodes.locations}, with a regional target of{" "}
                  {ashantiCodes.target.toLowerCase()}.
                </p>
              </div>
              <div className="facts">
                <div className="fact">
                  <span>Who it is for</span>
                  <span>{ashantiCodes.audience}</span>
                </div>
                <div className="fact">
                  <span>Subjects</span>
                  <span>{ashantiCodes.subjects.join(" · ")}</span>
                </div>
                <div className="fact">
                  <span>Format</span>
                  <span>{ashantiCodes.format}</span>
                </div>
              </div>
              <h3 className="sub-h">What students built</h3>
              <ul className="ticks">
                {ashantiCodes.projects.map((p) => (
                  <li key={p}>
                    <Icon name="check" />
                    <div>
                      <span className="muted">{p}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Photo
                src={clubs[0].image}
                alt={clubs[0].imageAlt}
                caption="Ashanti Codes cohorts have exhibited in Wiamoase and Obuasi"
                ratio="4-3"
                sizes="(max-width: 900px) 100vw, 40vw"
              />
              <div className="callout">
                <Icon name="users" />
                <div>
                  <b>Ashanti Codes is cohort-based</b>
                  <span className="muted">
                    It is not a weekly club and places are limited per cohort. Ask the library team when the next
                    cohort opens.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Join one</p>
              <h2>Registration is a short visit.</h2>
              <p>
                Come to the centre, meet the mentors, and try a session before you commit. Bring a parent or guardian
                if you are under 18.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <Icon name="check" />
                  No prior experience needed
                </li>
                <li>
                  <Icon name="check" />
                  All clubs free to join
                </li>
                <li>
                  <Icon name="check" />
                  Mentors matched by the library team
                </li>
              </ul>
              <a className="btn btn-lg" href="/#visit">
                Register interest
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}