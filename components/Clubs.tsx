"use client";

import { KeyboardEvent, useState } from "react";
import ClubIcon from "./ClubIcon";
import { clubs } from "@/lib/data";

const DAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Clubs() {
  const [active, setActive] = useState(clubs[0].id);
  const club = clubs.find((c) => c.id === active) ?? clubs[0];

  const meetsDays = DAY_NAMES.filter((_, i) => club.days[i]);

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    const idx = clubs.findIndex((c) => c.id === active);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % clubs.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + clubs.length) % clubs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = clubs.length - 1;
    else return;
    e.preventDefault();
    setActive(clubs[next].id);
    requestAnimationFrame(() =>
      document.getElementById(`club-tab-${clubs[next].id}`)?.focus(),
    );
  }

  return (
    <section id="clubs">
      <div className="container">
        <div className="heading">
          <p className="eyebrow">Clubs</p>
          <h2>Three clubs for curious minds.</h2>
          <p className="muted">Hands-on learning in the Robotics &amp; ICT Centre and the library&apos;s reading space.</p>
        </div>

        <div className="tabs-list" role="tablist" aria-label="Club programmes" onKeyDown={onTabKey}>
          {clubs.map((c) => (
            <button
              key={c.id}
              id={`club-tab-${c.id}`}
              role="tab"
              type="button"
              aria-selected={c.id === active}
              aria-controls="club-panel"
              tabIndex={c.id === active ? 0 : -1}
              className={`tab${c.id === active ? " active" : ""}`}
              onClick={() => setActive(c.id)}
            >
              <ClubIcon club={c} size={16} />
              {c.label}
            </button>
          ))}
        </div>

        <div
          className="tab-panel active card"
          role="tabpanel"
          id="club-panel"
          aria-labelledby={`club-tab-${active}`}
        >
          <div className="club">
            <div className="club-left">
              <span className="badge badge-brand">{club.badge}</span>
              <h3>{club.title}</h3>
              <p className="muted">{club.blurb}</p>
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
              </dl>
              <div className="days" role="img" aria-label={`Meeting days: ${meetsDays.join(" and ")}`}>
                {DAY_LETTERS.map((d, i) => (
                  <span key={i} className={club.days[i] ? "on" : undefined} aria-hidden="true" title={DAY_NAMES[i]}>
                    {d}
                  </span>
                ))}
              </div>
              <a
                href={`/?topic=${encodeURIComponent(club.title)}#visit`}
                className="btn btn-default"
                data-dialog="join"
                data-club={club.title}
              >
                Register interest
              </a>
              <a href="/join" className="card-link">
                How joining works →
              </a>
            </div>
            <div className="club-right">
              <h4>Programmes</h4>
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
          </div>
        </div>

        <p className="clubs-note muted">
          All clubs are free to join. Times can change, so please confirm with the library team before you travel.{" "}
          <a href="/clubs">Compare every club</a>.
        </p>
      </div>
    </section>
  );
}
