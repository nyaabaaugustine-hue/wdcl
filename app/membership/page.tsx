import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { FACEBOOK_URL } from "@/lib/data";
import DemoNote from "@/components/DemoNote";
import { DEMO_MEMBERSHIP, membershipBenefits, membershipDetails, membershipPolicies } from "@/lib/membership";

export const metadata: Metadata = {
  title: "Membership | Wiamoase Diaspora Public Library",
  description:
    "How to become a member of the Wiamoase Diaspora Public Library: free digital membership through the Ghana Library app, free clubs, and what to ask about borrowing books at the centre.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Membership</span>
          </nav>
        }
        title="Become a member."
        lead="Join the Wiamoase library community. Digital membership is free today, and our team is finalising the details for borrowing books at the centre."
        pattern
        priority
      >
        <div className="btn-row u-mt24">
          <Link className="btn btn-default btn-lg" href="/books">
            Join the free digital library
          </Link>
          <a className="btn btn-outline btn-lg" href="/contact" data-dialog="visit" data-topic="General enquiry">
            Ask about membership
          </a>
        </div>
      </PageHero>

      <section id="ways">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Two ways to belong</p>
            <h2>Read online today. Borrow in person soon.</h2>
            <p className="muted">
              You can start reading for free from your phone straight away, and visit the centre to find
              out about borrowing books.
            </p>
          </div>

          <div className="mem-ways">
            <article className="mem-way">
              <span className="badge badge-brand">Free · Available now</span>
              <h3>Digital library membership</h3>
              <p className="muted">
                Wiamoase is a branch of the Ghana Library Authority, so you can join its free national
                digital library.
              </p>
              <ul>
                <li>
                  <Icon name="check" size={16} />
                  Free e-books, audiobooks and educational videos
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Sign up with an email address or phone number
                </li>
                <li>
                  <Icon name="check" size={16} />
                  No library card needed
                </li>
              </ul>
              <Link className="btn btn-default" href="/books">
                See how to join
                <Icon name="arrow" size={16} />
              </Link>
            </article>

            <article className="mem-way">
              <span className="badge badge-secondary">At the centre · Details to be confirmed</span>
              <h3>Borrowing member</h3>
              <p className="muted">
                Register at the library in Agona Wiamoase to use the reading area and ask about borrowing
                books. Our team is confirming the exact rules.
              </p>
              <ul>
                <li>
                  <Icon name="check" size={16} />
                  Meet the team and see the shelves
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Ask about who can join and what to bring
                </li>
                <li>
                  <Icon name="check" size={16} />
                  Clubs are free to join for everyone
                </li>
              </ul>
              <a className="btn btn-outline" href="/contact" data-dialog="visit" data-topic="General enquiry">
                Ask the team
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="band" id="details">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">The details</p>
            <h2>What to know before you join.</h2>
            <p className="muted">
              The answers below are demo examples for now. Each one is replaced as soon as the library confirms its real rule.
              Until then, ask the team and they will tell you.
            </p>
          </div>

          {DEMO_MEMBERSHIP ? <DemoNote /> : null}
          <div className="mem-table" role="list">
            {membershipDetails.map((d) => (
              <div className="mem-row" role="listitem" key={d.id}>
                <div>
                  <h3>{d.question}</h3>
                  <p className="muted">{d.hint}</p>
                </div>
                <p className="mem-value">
                  {d.value ? d.value : <span className="tbc">To be confirmed</span>}
                </p>
                {d.value ? null : (
                  <a
                    className="card-link"
                    href="/contact"
                    data-dialog="visit"
                    data-topic="General enquiry"
                    aria-label={`Ask the team: ${d.question}`}
                  >
                    Ask us →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">What you get</p>
            <h2>Membership at no cost.</h2>
          </div>
          <div className="role-grid">
            {membershipBenefits.map((b) => (
              <article className="role-card" key={b.title}>
                <span className="icon-box" aria-hidden="true">
                  <Icon name={b.icon} size={20} />
                </span>
                <h3>{b.title}</h3>
                <p className="muted">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" id="policies">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Library policies</p>
            <h2>Rules, written down.</h2>
            <p className="muted">
              Clear policies keep the library fair and welcoming. These are being finalised with the library
              team.
            </p>
          </div>
          <div className="mem-policies">
            {membershipPolicies.map((p) => (
              <details className="mem-policy" key={p.id}>
                <summary>
                  <span>{p.title}</span>
                  {p.summary ? null : <span className="tbc">Being finalised</span>}
                </summary>
                <p className="muted">
                  {p.summary ??
                    (p.id === "donations"
                      ? "If you would like to donate books, please contact the team first so they can tell you what the library can use."
                      : "The team is finalising this policy. Ask at the centre or send a message and they will explain how it works today.")}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Questions?</p>
              <h2>Talk to the library team.</h2>
              <p>
                Ask about joining, opening hours or anything else. We reply as soon as we can, and the team
                is also on Facebook.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <Icon name="check" />
                  Free digital membership today
                </li>
                <li>
                  <Icon name="check" />
                  Free clubs for everyone
                </li>
                <li>
                  <Icon name="check" />
                  Friendly help at the centre
                </li>
              </ul>
              <div className="btn-row">
                <a className="btn btn-lg" href="/contact" data-dialog="visit" data-topic="General enquiry">
                  Send a message
                </a>
                <a className="btn btn-line btn-lg" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                  Message on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
