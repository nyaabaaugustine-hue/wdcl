import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { MAP_URL, memberStats, partners, sponsorTiers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sponsors & Supporters | Wiamoase Diaspora Public Library",
  description:
    "The diaspora members, foundations and organisations that funded and equipped the Wiamoase Diaspora Public Library and its Robotics & ICT Centre.",
};

export default function SponsorsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="kente-inline" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Sponsors &amp; supporters</span>
          </nav>
          <h1>A library paid for by people who had left it.</h1>
          <p className="lead muted">
            The Learning Development Centre in Agona Wiamoase was funded by citizens of the town living overseas,
            then equipped in partnership for STEM education. This page records who has given what.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="stats u-mt0">
            {memberStats.map((s) => (
              <div className="stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {sponsorTiers.map((tier, i) => (
        <section
          key={tier.id}
          className={[i % 2 === 0 ? "band" : "", i === 0 ? "section-tight" : ""].filter(Boolean).join(" ")}
        >
          <div className="container">
            <div className="heading">
              <p className="eyebrow">{tier.label}</p>
              <h2>{tier.sponsors.length} supporter{tier.sponsors.length === 1 ? "" : "s"}</h2>
              <p className="muted">{tier.blurb}</p>
            </div>
            <div className="tier-grid">
              {tier.sponsors.map((s) => (
                <article className={`supporter${s.confirmed ? "" : " pending"}`} key={`${tier.id}-${s.role}`}>
                  <span className={`supporter-mark mark-${tier.id}`} aria-hidden="true">
                    <Icon name={s.confirmed ? "check" : "heart"} size={18} />
                  </span>
                  <h3>{s.name}</h3>
                  <p className="role">{s.role}</p>
                  {s.note ? <p className="muted">{s.note}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Institutional partners</p>
            <h2>Who we work with.</h2>
            <p className="muted">
              Three organisations hold the library in place: the body that funds it, the body that hosts it, and the
              body that equipped it.
            </p>
          </div>
          <div className="partner-grid">
            {partners.map((p) => (
              <article className="partner" key={p.name}>
                <span className="badge badge-secondary">{p.kind}</span>
                <h3>{p.name}</h3>
                <p className="muted">{p.role}</p>
              </article>
            ))}
          </div>
          <a className="btn btn-outline u-mt24" href="/partners">
            More on partnerships
          </a>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Join them</p>
              <h2>Add your name to this page.</h2>
              <p>
                Book drives, equipment, scholarships and club sponsorships are all useful. Even small, regular
                contributions keep the centre running.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <Icon name="check" />
                  Sponsorship and recurring giving
                </li>
                <li>
                  <Icon name="check" />
                  Books and equipment in kind
                </li>
                <li>
                  <Icon name="check" />
                  Club and scholarship sponsorship
                </li>
              </ul>
              <div className="btn-row">
                <a className="btn btn-lg" href="/#visit">
                  Get in touch
                </a>
                <a
                  className="btn btn-lg btn-line"
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find the centre
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}