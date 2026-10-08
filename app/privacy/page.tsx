import type { Metadata } from "next";
import Link from "next/link";
import { FACEBOOK_URL, photo } from "@/lib/data";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy | Wiamoase Diaspora Public Library",
  description: "How the Wiamoase Diaspora Public Library website handles information you send it.",
};

const sections = [
  {
    h: "What this website collects",
    p: [
      "This site is a static informational website. Browsing it does not require an account, and we do not use advertising trackers, cross-site tracking pixels or third-party analytics cookies.",
      "The contact form, the club registration form and the newsletter sign-up are the only places where you can give us information. What you type is sent to us by email so we can reply.",
    ],
  },
  {
    h: "What we do with what you send",
    p: [
      "If you send us a message we keep it in our email inbox so we can respond. We use your details to reply to you and to plan club sessions, visits and community events.",
      "We do not sell, rent or share your personal information for marketing. We share it with nobody outside the library team unless we are legally required to, or you ask us to.",
    ],
  },
  {
    h: "Children and young people",
    p: [
      "The clubs at the centre are open to children and young people aged 10 to 18. The centre has said it will also advance the development of children with special needs from the town.",
      "We do not knowingly collect personal information from children directly through this website. If a child contacts us — for example through our Facebook page — a member of the library team will respond and keep the conversation appropriate.",
    ],
  },
  {
    h: "Your choices",
    p: [
      "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Contact us and we will deal with the request.",
      "Because we are a community project run on donated funds, we may keep basic correspondence so we can show a record of commitments made to the centre.",
    ],
  },
  {
    h: "Cookies",
    p: [
      "We store your light or dark theme preference in your browser's local storage. That never leaves your device and is not sent to us. If you clear your browser data, your preference resets to your system setting.",
    ],
  },
  {
    h: "Contact",
    p: [
      "For any question about your information, or to exercise any of the rights above, get in touch through the contact page or on Facebook. Requests are handled by the library team at Agona Wimoase.",
    ],
  },
] as const;

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Privacy</span>
          </nav>
        }
        title="What we do with your information."
        lead="A plain-language summary. This is a community library website, not a commercial service, and we collect as little as possible."
        image={photo("photo-1481627834876-b7833e8f5570", 1600)}
        priority
      />

      <section className="section-tight">
        <div className="container">
          <div className="privacy-wrap">
            <article className="card">
              <div className="card-content privacy-body">
                {sections.map((s) => (
                  <section key={s.h} id={slug(s.h)} className="privacy-sec">
                    <h2>{s.h}</h2>
                    {s.p.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </section>
                ))}
                <p className="muted privacy-note">
                  Last reviewed: this is a draft written to describe how the site actually behaves. Have it checked by
                  someone qualified in Ghanaian data protection law before the site goes live.
                </p>
              </div>
            </article>

            <aside>
              <nav className="card" aria-label="On this page">
                <div className="card-header">
                  <h2 className="card-title">On this page</h2>
                </div>
                <div className="card-content">
                  <ol className="toc">
                    {sections.map((s) => (
                      <li key={s.h}>
                        <a href={`#${slug(s.h)}`}>{s.h}</a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Talk to us</h2>
                </div>
                <div className="card-content">
                  <p className="muted">
                    Questions about this page, or about anything the centre does with your information, are welcome.
                  </p>
                  <a className="btn btn-default btn-block" href="/#visit">
                    Contact the library
                  </a>
                  <a
                    className="btn btn-outline btn-block"
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook page
                  </a>
                  <a className="back-top" href="#top">
                    ↑ Back to top
                  </a>
                </div>
              </div>
              <div className="callout">
                <div>
                  <b>Plain-language promise</b>
                  <span className="muted">
                    No advertising trackers. No data broker. No selling your details. Ever.
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}