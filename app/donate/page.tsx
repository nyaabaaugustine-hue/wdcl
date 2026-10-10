import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { partnerWays, photo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Support the Centre | Wiamoase Diaspora Public Library",
  description:
    "Ways to support the Wiamoase Diaspora Public Library: fund a club, equip the ICT lab, donate books, sponsor a scholarship, volunteer or hire the hall.",
};

const otherWays = [
  { title: "Volunteer your time", text: "Mentor a club or host a session, remotely or on site.", href: "/volunteer", label: "See volunteer roles" },
  { title: "Hire the hall", text: "Booking the conference centre helps cover running costs.", href: "/hire", label: "Hire the hall" },
  { title: "Become a partner", text: "Organisations can fund a specific programme with agreed reporting.", href: "/partners", label: "Partnerships" },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Support the centre</span>
          </nav>
        }
        title="Help keep the centre open."
        lead="The centre was built by Wiamoase citizens abroad. Its clubs, books and equipment keep running because people choose to keep giving."
        image={photo("donate-hero", 1600)}
        priority
      />

      <section className="section-tight">
        <div className="container">
          <div className="overview">
            <div>
              <div className="heading">
                <p className="eyebrow">Where help is most useful</p>
                <h2>Specific, reportable gifts.</h2>
                <p className="muted">
                  We would rather fund something specific and tell you what it bought than take a general gift we
                  cannot report on.
                </p>
              </div>
              <ul className="prog">
                {partnerWays.map((w, i) => (
                  <li key={w}>
                    <span className="n">{i + 1}</span>
                    <div>
                      <b>{w}</b>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="callout">
                <Icon name="heart" />
                <div>
                  <b>Online giving is not set up yet</b>
                  <span className="muted">
                    We do not want to point you to payment details that are not confirmed. Message the library team
                    and they will share the current, verified way to give.
                  </span>
                </div>
              </div>
              <a
                className="btn btn-default btn-block u-mt16"
                href="/#visit"
                data-dialog="visit"
                data-topic="Donations &amp; partnerships"
              >
                Ask how to give
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Other ways to help</p>
            <h2>Not everything is money.</h2>
          </div>
          <div className="role-grid">
            {otherWays.map((w) => (
              <article className="role-card" key={w.title}>
                <h3>{w.title}</h3>
                <p className="muted">{w.text}</p>
                <Link className="btn btn-outline" href={w.href}>
                  {w.label}
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
              <p className="eyebrow">Everyone who has given</p>
              <h2>See who has already helped.</h2>
              <p>Capital gifts, programme partners and in-kind donors are recorded on the sponsors page.</p>
            </div>
            <div>
              <Link className="btn btn-lg" href="/sponsors">
                See the sponsors page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
