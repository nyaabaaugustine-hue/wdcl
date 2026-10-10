import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import ClubIcon from "@/components/ClubIcon";
import PageHero from "@/components/PageHero";
import { clubs, photo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Join a Club | Wiamoase Diaspora Public Library",
  description:
    "How to join the Coding, Robotics or Reading club at the Wiamoase Diaspora Public Library. Free, beginner-friendly, and it starts with a short visit.",
};

const steps = [
  {
    title: "Pick a club",
    text: "Read what each club does and which days it meets. If you are unsure, start with the one that sounds most fun.",
  },
  {
    title: "Come and try a session",
    text: "Visit the centre, meet the mentors and sit in before you commit. Under 18? Bring a parent or guardian.",
  },
  {
    title: "Get matched",
    text: "The library team will place you in the right group for your age and experience.",
  },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Join a club</span>
          </nav>
        }
        title="Joining takes one short visit."
        lead="Every club is free, beginner-friendly and open to anyone in the right age group. There is nothing to prepare."
        image={photo("join-hero", 1600)}
        priority
      />

      <section className="section-tight">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">How it works</p>
            <h2>Three steps.</h2>
          </div>
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.title}>
                <b>{s.title}</b>
                <span className="muted">{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">The clubs</p>
            <h2>When and where each one meets.</h2>
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
                <p className="muted">{c.blurb}</p>
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
                <Link className="btn btn-outline" href={`/clubs/${c.id}`}>
                  About the {c.label} Club
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Ready?</p>
              <h2>Tell us which club you are interested in.</h2>
              <p>We will confirm the next session and what to bring.</p>
            </div>
            <div>
              <ul>
                <li>
                  <Icon name="check" />
                  Free to join
                </li>
                <li>
                  <Icon name="check" />
                  No experience needed
                </li>
                <li>
                  <Icon name="check" />
                  Parent or guardian welcome for under 18s
                </li>
              </ul>
              <a className="btn btn-lg" href="/#visit" data-dialog="visit" data-topic="General enquiry">
                Register interest
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
