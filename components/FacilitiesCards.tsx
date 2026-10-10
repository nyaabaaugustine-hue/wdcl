import Icon from "./Icon";
import FeatureIcon from "./FeatureIcon";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { facilities } from "@/lib/data";

/**
 * Photo-led cards: every facility is visible at once (no hover needed, so it
 * works on phones). Replaces the hover-to-swap layout in Facilities.tsx, which
 * is untouched. Switch back with NEW_CARDS in app/page.tsx.
 */
export default function FacilitiesCards() {
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

        <ul className="fx-grid">
          {facilities.map((f, i) => {
            const note = "note" in f ? f.note : null;
            return (
              <li key={f.title}>
                <Reveal delay={i * 70} className="fx-reveal">
                  <article className="fx-card">
                    <Photo
                      className="fx-photo"
                      src={f.image}
                      alt={f.imageAlt}
                      ratio="16-10"
                      sizes="(max-width: 800px) 100vw, 560px"
                    />
                    <div className="fx-body">
                      <span className="fx-icon" aria-hidden="true">
                        <FeatureIcon name={f.icon} size={36} />
                      </span>
                      <h3>{f.title}</h3>
                      <p>{f.text}</p>
                      {note ? <p className="fx-note">{note}</p> : null}
                      <a className="fx-link" href={f.href}>
                        See {f.title}
                        <Icon name="arrow" size={14} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
