"use client";

import { useState } from "react";
import Icon from "./Icon";
import Photo from "./Photo";
import { facilities } from "@/lib/data";

export default function Facilities() {
  const [active, setActive] = useState(0);
  const current = facilities[active];

  return (
    <section id="facilities" className="band">
      <div className="container">
        <div className="heading">
          <p className="eyebrow">Facilities &amp; services</p>
          <h2>More than books.</h2>
          <p className="muted">
            Community spaces under one roof — a library, a robotics and ICT lab, a conference hall and
            after-school learning.
          </p>
        </div>
        <div className="fac-layout">
          <Photo
            key={current.title}
            className="fac-photo fac-photo-swap"
            src={current.image}
            alt={current.imageAlt}
            ratio="4-5"
            sizes="(max-width: 900px) 100vw, 42vw"
          />
          <div className="fac-list">
            {facilities.map((f, i) => {
              const note = "note" in f ? f.note : null;
              return (
                <article
                  className={`fac-row${i === active ? " is-active" : ""}`}
                  key={f.title}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="icon-box">
                    <Icon name={f.icon} />
                  </span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                    {note ? <p className="fac-note">{note}</p> : null}
                    <a className="card-link" href={f.href}>
                      See {f.title} <Icon name="arrow" size={13} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
