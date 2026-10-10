"use client";

import ClubIcon from "./ClubIcon";
import FeatureIcon from "./FeatureIcon";
import Reveal from "./Reveal";
import { clubs } from "@/lib/data";

const DAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * All three clubs side by side, with the programmes tucked into an accessible
 * "What you'll do" disclosure. Replaces the tabbed layout in Clubs.tsx, which is
 * untouched. Switch back with NEW_CARDS in app/page.tsx.
 *
 * `bare` renders only the card grid (no section, heading or footnote) so inner
 * pages such as /clubs can reuse it under their own heading.
 */
export default function ClubsCards({ bare = false }: { bare?: boolean }) {
  const grid = (
    <ul className="cl-grid">
      {clubs.map((club, i) => {
        const meetsDays = DAY_NAMES.filter((_, d) => club.days[d]);
        return (
          <li key={club.id}>
            <Reveal delay={i * 80} className="cl-reveal">
              <article className="cl-card" aria-labelledby={`cl-${club.id}`}>
                <header className="cl-head">
                  <span className="cl-icon" aria-hidden="true">
                    {club.iconImg ? <ClubIcon club={club} size={28} /> : <FeatureIcon name={club.icon} size={30} />}
                  </span>
                  <span className="badge badge-brand">{club.badge}</span>
                </header>

                <div className="cl-body">
                  <h3 id={`cl-${club.id}`}>{club.title}</h3>
                  <p className="muted">{club.blurb}</p>

                  <dl className="cl-facts">
                    <div>
                      <dt>Meets</dt>
                      <dd>{club.meets}</dd>
                    </div>
                    <div>
                      <dt>Time</dt>
                      <dd>{club.time}</dd>
                    </div>
                    <div>
                      <dt>Venue</dt>
                      <dd>{club.venue}</dd>
                    </div>
                  </dl>

                  <div className="days" role="img" aria-label={`Meeting days: ${meetsDays.join(" and ")}`}>
                    {DAY_LETTERS.map((d, k) => (
                      <span key={k} className={club.days[k] ? "on" : undefined} aria-hidden="true" title={DAY_NAMES[k]}>
                        {d}
                      </span>
                    ))}
                  </div>

                  <details className="cl-more">
                    <summary>What you&apos;ll do</summary>
                    <ul className="cl-prog">
                      {club.programmes.map((p, k) => (
                        <li key={p.title}>
                          <span className="n">{k + 1}</span>
                          <div>
                            <b>{p.title}</b>
                            <span>{p.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div className="cl-actions">
                    <a
                      href={`/?topic=${encodeURIComponent(club.title)}#visit`}
                      className="btn btn-default"
                      data-dialog="join"
                      data-club={club.title}
                    >
                      Register interest
                    </a>
                    <a href={`/clubs/${club.id}`} className="card-link">
                      About the club →
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );

  if (bare) return grid;

  return (
    <section id="clubs">
      <div className="container">
        <div className="heading">
          <p className="eyebrow">Clubs</p>
          <h2>Three clubs for curious minds.</h2>
          <p className="muted">
            Hands-on learning in the Robotics &amp; ICT Centre and the library&apos;s reading space.
          </p>
        </div>

        {grid}

        <p className="clubs-note muted">
          All clubs are free to join. Times can change, so please confirm with the library team before you travel.{" "}
          <a href="/clubs">Compare every club</a> · <a href="/join">How joining works</a>.
        </p>
      </div>
    </section>
  );
}
