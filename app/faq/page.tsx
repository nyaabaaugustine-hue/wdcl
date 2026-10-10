import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ADDRESS, FACEBOOK_URL, MAP_URL, photo } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ | Wiamoase Diaspora Public Library",
  description:
    "Answers to common questions about the Wiamoase Diaspora Public Library: who runs it, where it is, the clubs, volunteering and how to support the centre.",
};

type QA = { q: string; a: React.ReactNode };

const faqs: QA[] = [
  {
    q: "Who runs the library?",
    a: (
      <>
        The library is a branch of the Ghana Library Authority. It was established by Wiamoase Citizens in the
        Diaspora, a union of people from the town now living abroad, who funded the Learning Development Centre
        that houses it.
      </>
    ),
  },
  {
    q: "Where is it?",
    a: (
      <>
        {ADDRESS}.{" "}
        <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
          Open it on the map
        </a>
        .
      </>
    ),
  },
  {
    q: "What are the opening hours?",
    a: (
      <>
        Opening hours have not been confirmed on this site yet. Until they are, please{" "}
        <Link href="/contact">send us a message</Link> or write to us on{" "}
        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>{" "}
        before you travel.
      </>
    ),
  },
  {
    q: "Are the clubs free? Do I need experience?",
    a: (
      <>
        Every club is free to join and beginner-friendly. Nobody is expected to have coded, built a robot or read
        widely before they start. See <Link href="/clubs">the clubs</Link> for ages and times.
      </>
    ),
  },
  {
    q: "What ages can join?",
    a: (
      <>
        The Coding Club is for ages 10–18, the Robotics Club for ages 12–18, and the Reading Club is open to all
        ages. If you are under 18, please bring a parent or guardian when you first visit.
      </>
    ),
  },
  {
    q: "What is Ashanti Codes?",
    a: (
      <>
        A separate weekend training programme from the Telecel Ghana Foundation, delivered with the Ghana Library
        Authority. It is cohort-based rather than weekly, so places are limited. Ask the library team when the next
        cohort opens, or read the <Link href="/programs">programmes page</Link>.
      </>
    ),
  },
  {
    q: "Can I borrow books?",
    a: (
      <>
        Borrowing and membership rules have not been published on this site yet. Please ask the library team on
        your visit or <Link href="/contact">get in touch</Link> and we will point you to the current rules.
      </>
    ),
  },
  {
    q: "I live abroad. Can I help?",
    a: (
      <>
        Yes. Several <Link href="/volunteer">volunteer roles</Link> can be done remotely, such as mentoring a club,
        hosting a reading session or coordinating book and equipment drives. You can also{" "}
        <Link href="/donate">support the centre</Link> in other ways.
      </>
    ),
  },
  {
    q: "Can I hire the conference hall?",
    a: (
      <>
        The furnished hall is available for meetings, workshops and community events, and hire helps maintain the
        centre. See <Link href="/hire">hiring the hall</Link>.
      </>
    ),
  },
  {
    q: "Is there a way to report a problem with this website?",
    a: (
      <>
        Yes. If anything on the site is hard to use or read, tell us through the{" "}
        <Link href="/contact">contact page</Link> and see the <Link href="/accessibility">accessibility note</Link>.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>FAQ</span>
          </nav>
        }
        title="Questions, answered plainly."
        lead="If something here is marked as not yet confirmed, we would rather say so than guess."
        image={photo("faq-hero", 1600)}
        priority
      />

      <section className="section-tight">
        <div className="container">
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="answer">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Still wondering?</p>
              <h2>Ask the library team.</h2>
              <p>One short message is enough. We will reply as soon as we can.</p>
            </div>
            <div>
              <Link className="btn btn-lg" href="/contact">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
