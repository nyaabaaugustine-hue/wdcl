import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import ClubIcon from "@/components/ClubIcon";
import { ashantiCodes, clubs, photo } from "@/lib/data";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Programs | Wiamoase Diaspora Public Library",
  description:
    "Every programme at the Wiamoase Diaspora Public Library — twelve weekly programmes across the Coding, Robotics and Reading clubs, plus the Ashanti Codes weekend training.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Our Programs</span>
          </nav>
        }
        title="Our Programs."
        lead={`Twelve weekly programmes across three clubs, plus the ${ashantiCodes.name} weekend training — every one of them free to join.`}
        image={photo("photo-1522202176988-66273c2fd55f", 1600)}
        priority
      />

      <section className="section-tight">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Weekly programmes</p>
            <h2>What runs each week.</h2>
            <p className="muted">
              Each club keeps a short programme list, so members know what a
              session covers before they turn up. Open a club for ages, times
              and the full story.
            </p>
          </div>

          <div className="club-grid">
            {clubs.map((c) => (
              <article className="club-card" key={c.id}>
                <div className="club-card-top">
                  <span className="icon-box" aria-hidden="true">
                    <ClubIcon club={c} size={20} />
                  </span>
                  <span className="badge badge-secondary">{c.ageGroup}</span>
                </div>
                <h3>{c.title}</h3>
                <dl className="mini-facts">
                  <div>
                    <dt>Meets</dt>
                    <dd>{c.meets}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{c.time}</dd>
                  </div>
                  <div>
                    <dt>Venue</dt>
                    <dd>{c.venue}</dd>
                  </div>
                </dl>
                <ul className="prog">
                  {c.programmes.map((p, i) => (
                    <li key={p.title}>
                      <span className="n">{i + 1}</span>
                      <div>
                        <b>{p.title}</b>
                        <span className="d">{p.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link className="btn btn-outline" href={`/clubs/${c.id}`}>
                  About the {c.label} Club
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="overview">
            <div>
              <div className="heading">
                <p className="eyebrow">Weekend programme</p>
                <h2>{ashantiCodes.name}.</h2>
                <p className="muted">
                  A separate programme from the weekly clubs: structured weekend
                  training from the {ashantiCodes.funder} for{" "}
                  {ashantiCodes.audience.toLowerCase()}, delivered with{" "}
                  {ashantiCodes.partners} across {ashantiCodes.locations}.
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
              <Link className="btn btn-default" href="/clubs">
                Full details under Clubs
              </Link>
            </div>
            <div>
              <ul className="ticks">
                {ashantiCodes.projects.map((p) => (
                  <li key={p}>
                    <Icon name="check" />
                    <div>
                      <b>{p}</b>
                      <span className="muted">
                        Built by students in previous cohorts.
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Join one</p>
              <h2>Try a session first.</h2>
              <p>
                Come to the centre, meet the mentors and sit in on a programme
                before you decide. Bring a parent or guardian if you are under
                18.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <Icon name="check" />
                  Every programme free to join
                </li>
                <li>
                  <Icon name="check" />
                  Beginners welcome at any age
                </li>
                <li>
                  <Icon name="check" />
                  The team will match you to the right session
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
