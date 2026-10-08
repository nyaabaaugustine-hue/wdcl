import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import { partners, partnerWays, storyPhoto, photo } from "@/lib/data";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Partners | Wiamoase Diaspora Public Library",
  description:
    "Organisations that fund, host and equip the Wiamoase Diaspora Public Library, and the ways organisations can work with it.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Partnerships</span>
          </nav>
        }
        title="Built with, not just funded by."
        lead="The centre is held up by three kinds of relationship: the diaspora body that raised the capital, the national body that hosts the branch, and the foundation that equipped the ICT centre."
        image={photo("photo-1519389950473-47ba0277781c", 1600)}
        priority
      />

      <section className="section-tight">
        <div className="container">
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
                <h2>{p.name}</h2>
                <p className="muted">{p.role}</p>
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
                <p className="eyebrow">Work with us</p>
                <h2>What a partnership looks like.</h2>
                <p className="muted">
                  We would rather build something specific and long-lasting than accept a general donation we cannot
                  report on. These are the areas where help is most useful right now.
                </p>
              </div>
              <ul className="prog">
                {partnerWays.map((w, i) => (
                  <li key={w}>
                    <span className="n">{i + 1}</span>
                    <div>
                      <b>{w}</b>
                      <span className="d">Scope and reporting agreed with the library team before work begins.</span>
                    </div>
                  </li>
                ))}
              </ul>
              <a className="btn btn-default u-mt24" href="/#visit">
                Start a conversation
              </a>
            </div>
            <div>
              <Photo
                src={storyPhoto.src}
                alt={storyPhoto.alt}
                caption={storyPhoto.caption}
                ratio="3-2"
                sizes="(max-width: 900px) 100vw, 40vw"
              />
              <div className="callout">
                <Icon name="heart" />
                <div>
                  <b>A note on reporting</b>
                  <span className="muted">
                    The centre is administered by the Ghana Library Authority. We will always tell you what a gift
                    bought, and publish figures once they are confirmed.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Funding &amp; support</p>
              <h2>Everyone who has given.</h2>
              <p>Capital gifts, programme partners and in-kind donors are all recorded on the sponsors page.</p>
            </div>
            <div>
              <a className="btn btn-lg" href="/sponsors">
                See the sponsors page
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}