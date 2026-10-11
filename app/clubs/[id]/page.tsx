import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyLink from "@/components/CopyLink";
import Icon from "@/components/Icon";
import ClubIcon from "@/components/ClubIcon";
import ClubSlider from "@/components/ClubSlider";
import PageHero from "@/components/PageHero";
import { clubs, stemLab } from "@/lib/data";
import { GENERIC_ALT } from "@/lib/media";

const DAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return clubs.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const club = clubs.find((c) => c.id === id);
  if (!club) return { title: "Club not found | Wiamoase Diaspora Public Library" };
  return {
    title: `${club.title} | Wiamoase Diaspora Public Library`,
    description: `${club.blurb} Meets ${club.meets.toLowerCase()}, ${club.time}, in the ${club.venue}.`,
  };
}

export default async function ClubPage({ params }: Params) {
  const { id } = await params;
  const club = clubs.find((c) => c.id === id);
  if (!club) notFound();

  const others = clubs.filter((c) => c.id !== club.id);
  const isRobotics = club.id === "robotics";
  const idx = clubs.findIndex((c) => c.id === club.id);
  const prev = clubs[(idx - 1 + clubs.length) % clubs.length];
  const next = clubs[(idx + 1) % clubs.length];

  const photos = [
    { src: club.image, alt: club.imageAlt },
    ...club.gallery.map((src) => ({ src, alt: GENERIC_ALT })),
  ];

  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span>{" "}
            <Link href="/clubs">Clubs</Link> <span aria-hidden="true">/</span> {club.label}
          </nav>
        }
        title={club.title}
        lead={club.blurb}
        pattern
        priority
      >
        <div className="page-hero-badges">
          <span className="badge badge-brand">{club.badge}</span>
          {club.supporter ? <span className="badge badge-secondary">{club.supporter}</span> : null}
        </div>
        <div className="btn-row u-mt24">
          <a className="btn btn-default btn-lg" href={`/?topic=${encodeURIComponent(club.title)}#visit`} data-dialog="join" data-club={club.title}>
            Register interest
          </a>
        </div>
      </PageHero>

      <section className="section-tight">
        <div className="container">
          <div className="club-detail">
            <div>
              <ClubSlider photos={photos} label={club.title} />

              <h2 className="sub-h">About the club</h2>
              <p className="prose-p">{club.longDesc}</p>

              <h2 className="sub-h">What you&apos;ll do</h2>
              <ul className="prog">
                {club.programmes.map((p, i) => (
                  <li key={p.title}>
                    <span className="n">{i + 1}</span>
                    <div>
                      <b>{p.title}</b>
                      <span className="d">{p.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <aside>
              <div className="card sticky-card">
                <div className="card-header">
                  <h2 className="card-title">Session details</h2>
                </div>
                <div className="card-content">
                  <dl className="facts">
                    <div className="fact">
                      <dt>Meets</dt>
                      <dd>{club.meets}</dd>
                    </div>
                    <div className="fact">
                      <dt>Time</dt>
                      <dd>{club.time}</dd>
                    </div>
                    <div className="fact">
                      <dt>Venue</dt>
                      <dd>{club.venue}</dd>
                    </div>
                    <div className="fact">
                      <dt>Age group</dt>
                      <dd>{club.ageGroup}</dd>
                    </div>
                  </dl>
                  <div className="days days-labelled">
                    {DAY_LETTERS.map((d, i) => (
                      <span key={i} className={club.days[i] ? "on" : undefined} title={DAY_NAMES[i]}>
                        {d}
                      </span>
                    ))}
                  </div>
                  <ul className="tight">
                    <li>
                      <Icon name="users" />
                      <span className="muted">{club.whoFor[0]}</span>
                    </li>
                    <li>
                      <Icon name="check" />
                      <span className="muted">Free to join</span>
                    </li>
                    <li>
                      <Icon name="check" />
                      <span className="muted">No prior experience required</span>
                    </li>
                  </ul>
                  <a
                    className="btn btn-default btn-block"
                    href={`/?topic=${encodeURIComponent(club.title)}#visit`}
                    data-dialog="join"
                    data-club={club.title}
                  >
                    Register interest
                  </a>
                  <a
                    className="btn btn-outline btn-block"
                    href={`/contact`}
                    data-dialog="visit"
                    data-topic={club.title}
                  >
                    Ask a question
                  </a>
                  <CopyLink className="back-top" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {isRobotics ? (
        <section className="band">
          <div className="container">
            <div className="heading">
              <p className="eyebrow">What you&apos;ll work with</p>
              <h2>Equipment on site.</h2>
              <p className="muted">
                The {stemLab.funder} equipped the lab at a reported {stemLab.reportedValue}.{" "}
                {stemLab.distinction}.
              </p>
            </div>
            <ul className="ticks ticks-3">
              {stemLab.equipment.map((e) => (
                <li key={e.name}>
                  <Icon name="check" />
                  <div>
                    <b>{e.name}</b>
                    <span className="muted">{e.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className={isRobotics ? undefined : "band"}>
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Join in</p>
              <h2>Ready to try the {club.label} Club?</h2>
              <p>
                Tell us you are interested and the library team will get back to you with a place.
                Bring a parent or guardian if you are under 18.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <Icon name="check" />
                  Free to join
                </li>
                <li>
                  <Icon name="check" />
                  No prior experience needed
                </li>
                <li>
                  <Icon name="check" />
                  {club.meets}, {club.time}
                </li>
              </ul>
              <a
                className="btn btn-lg"
                href={`/?topic=${encodeURIComponent(club.title)}#visit`}
                data-dialog="join"
                data-club={club.title}
              >
                Register interest
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Also at the centre</p>
            <h2>The other clubs.</h2>
          </div>
          <div className="club-grid">
            {others.map((c) => (
              <article className="club-card" key={c.id}>
                <div className="club-card-top">
                  <span className="icon-box" aria-hidden="true">
                    <ClubIcon club={c} size={20} />
                  </span>
                  <span className="badge badge-secondary">{c.ageGroup}</span>
                </div>
                <h3>{c.title}</h3>
                <p className="muted">{c.blurb}</p>
                <div className="mini-facts">
                  <div>
                    <dt>Meets</dt>
                    <dd>{c.meets}</dd>
                  </div>
                  <div>
                    <dt>Venue</dt>
                    <dd>{c.venue}</dd>
                  </div>
                </div>
                <Link className="btn btn-outline" href={`/clubs/${c.id}`}>
                  About the {c.label} Club
                </Link>
              </article>
            ))}
          </div>

          <nav className="club-nav" aria-label="Club navigation">
            <Link className="club-nav-prev" href={`/clubs/${prev.id}`}>
              <span aria-hidden="true">←</span> {prev.label}
            </Link>
            <Link href="/clubs">All clubs</Link>
            <Link className="club-nav-next" href={`/clubs/${next.id}`}>
              {next.label} <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
