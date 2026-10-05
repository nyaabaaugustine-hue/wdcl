"use client";

import { useState } from "react";
import Icon from "./Icon";
import { clubs } from "@/lib/data";

const DAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];

export default function Clubs() {
  const [active, setActive] = useState(clubs[0].id);
  const club = clubs.find((c) => c.id === active) ?? clubs[0];

  return (
    <section id="clubs" className="band">
      <div className="container">
        <div className="heading">
          <p className="eyebrow">Clubs</p>
          <h2>Three clubs for curious minds.</h2>
          <p className="muted">Hands-on learning in the Robotics &amp; ICT Centre and the library&apos;s reading space.</p>
        </div>

        <div className="tabs-list" role="tablist">
          {clubs.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === active}
              className={`tab${c.id === active ? " active" : ""}`}
              onClick={() => setActive(c.id)}
            >
              <Icon name={c.icon} />
              {c.label}
            </button>
          ))}
        </div>

        <div className="tab-panel active card" role="tabpanel">
          <div className="club">
            <div className="club-left">
              <span className="badge badge-brand">{club.badge}</span>
              <h3>{club.title}</h3>
              <p className="muted">{club.blurb}</p>
              <div className="facts">
                <div className="fact">
                  <span>Meets</span>
                  <span>{club.meets}</span>
                </div>
                <div className="fact">
                  <span>Time</span>
                  <span>{club.time}</span>
                </div>
                <div className="fact">
                  <span>Venue</span>
                  <span>{club.venue}</span>
                </div>
              </div>
              <a href="#visit" className="btn btn-default">
                Register interest
              </a>
              <div className="days">
                {DAY_LETTERS.map((d, i) => (
                  <span key={i} className={club.days[i] ? "on" : undefined}>
                    {d}
                  </span>
                ))}
              </div>
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

        <div className="card table-wrap">
          <table>
            <caption>
              Proposed schedule: days, times and venues to be confirmed with the library team before publishing.
            </caption>
            <thead>
              <tr>
                <th>Club</th>
                <th>Days</th>
                <th>Time</th>
                <th>Age group</th>
                <th>Venue</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((c) => (
                <tr key={c.id}>
                  <td>
                    <b>{c.label}</b>
                  </td>
                  <td>{c.shortDays}</td>
                  <td>{c.time}</td>
                  <td>{c.ageGroup}</td>
                  <td>{c.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
