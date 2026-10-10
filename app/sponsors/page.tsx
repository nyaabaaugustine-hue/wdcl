import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { MAP_URL, memberStats, partners, sponsorTiers, photo } from "@/lib/data";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Sponsors & Supporters | Wiamoase Diaspora Public Library",
  description:
    "The diaspora members, foundations and organisations that funded and equipped the Wiamoase Diaspora Public Library and its Robotics & ICT Centre.",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Sponsors &amp; supporters</span>
          </nav>
        }
        title="Built by the community"
        lead="The Learning Development Centre in Agona Wiamoase was funded by citizens of the town living overseas, then equipped in partnership for STEM education. This page records who has given what."
        image={photo("photo-1519389950473-47ba0277781c", 1600)}
        priority
      />

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
                  {s.logo ? (
                    <Image
                      className="supporter-logo"
                      src={s.logo}
                      alt={`${s.name} logo`}
                      width={152}
                      height={120}
                      sizes="76px"
                    />
                  ) : (
                    <span className={`supporter-mark mark-${tier.id}`} aria-hidden="true">
                      <Icon name={s.confirmed ? "check" : "heart"} size={18} />
                    </span>
                  )}
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
                <Image
                  className="partner-logo"
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={152}
                  height={120}
                  sizes="76px"
                />
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