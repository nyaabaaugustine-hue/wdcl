import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import DigitalLibrary from "@/components/DigitalLibrary";
import { visitPhoto } from "@/lib/data";
import { digitalLibrary as d } from "@/lib/digitalLibrary";

export const metadata: Metadata = {
  title: "Digital library | Wiamoase Diaspora Public Library",
  description:
    "Read for free on your phone: e-books, audiobooks and educational videos through the Ghana Library Authority's Ghana Library app, available to readers at the Wiamoase Diaspora Public Library.",
};

export default function BooksPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Digital library</span>
          </nav>
        }
        title="Digital library."
        lead="E-books, audiobooks and educational videos, free on your phone, through the Ghana Library app."
        image={visitPhoto}
        priority
      />

      <DigitalLibrary home={false} />

      <section className="band">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Good to know</p>
            <h2>What the app gives you.</h2>
            <p className="muted">
              The app is built by the Ghana Library Authority for readers across the country,
              including everyone who uses the Wiamoase library.
            </p>
          </div>
          <ul className="ticks ticks-3">
            {d.features.map((f) => (
              <li key={f.title}>
                <Icon name="check" />
                <div>
                  <b>{f.title}</b>
                  <span className="muted">{f.text}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="callout">
            <Icon name="mail" size={22} />
            <div>
              <b>Having trouble signing in?</b>
              <span className="muted">
                The Ghana Library Authority&apos;s support team can help with accounts. Email{" "}
                <a href={`mailto:${d.supportEmail}`}>{d.supportEmail}</a>.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Prefer paper?</p>
              <h2>Come and read with us.</h2>
              <p>
                The community library in Agona Wiamoase serves students, teachers and
                residents. Visit the centre, meet the team and see the shelves for yourself.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <Icon name="check" />
                  Serving students, teachers and residents
                </li>
                <li>
                  <Icon name="check" />
                  Meet the team and see the centre
                </li>
                <li>
                  <Icon name="check" />
                  Clubs for coding, robotics and reading
                </li>
              </ul>
              <a className="btn btn-lg" href="/#visit" data-dialog="visit">
                Plan your visit
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
