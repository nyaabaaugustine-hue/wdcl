import Icon from "./Icon";
import Photo from "./Photo";
import { facilities } from "@/lib/data";

export default function Facilities() {
  return (
    <section id="facilities">
      <div className="container">
        <div className="heading">
          <p className="eyebrow">Facilities &amp; services</p>
          <h2>More than books.</h2>
          <p className="muted">Three spaces under one roof, designed for reading, learning and community life.</p>
        </div>
        <div className="grid g3">
          {facilities.map((f) => (
            <div className="card group" key={f.title}>
              <Photo
                className="card-figure"
                src={f.image}
                alt={f.imageAlt}
                ratio="16-10"
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <div className="card-header">
                <div className="icon-box">
                  <Icon name={f.icon} />
                </div>
                <h3 className="card-title">{f.title}</h3>
                <p className="card-desc">{f.text}</p>
                <a className="card-link" href={f.href}>
                  Learn more <Icon name="arrow" size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}