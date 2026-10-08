import Icon from "./Icon";
import Photo from "./Photo";
import { facilities } from "@/lib/data";

export default function Facilities() {
  const [feature] = facilities;

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
            className="fac-photo"
            src={feature.image}
            alt={feature.imageAlt}
            ratio="4-5"
            sizes="(max-width: 900px) 100vw, 42vw"
          />
          <div className="fac-list">
            {facilities.map((f) => (
              <article className="fac-row" key={f.title}>
                <span className="icon-box">
                  <Icon name={f.icon} />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <a className="card-link" href={f.href}>
                    Learn more <Icon name="arrow" size={13} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
