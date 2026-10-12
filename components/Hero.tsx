import HeroBackdrop from "./HeroBackdrop";
import Image from "next/image";
import { MAP_URL, partners } from "@/lib/data";

export default function Hero() {
  return (
    <section className="hero">
      <HeroBackdrop />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="container">
        <a href="#facilities" className="badge badge-secondary">
          <span className="dot" /> Robotics &amp; ICT Centre, powered by MTN Ghana Foundation →
        </a>
        <h1>
          A public library, ICT centre and community space in <span>Agona Wiamoase.</span>
        </h1>
        <p className="lead muted">
          Built by Wiamoase citizens abroad for the town&apos;s children: a reading room, a Robotics &amp; ICT
          Centre and a meeting hall under one roof.
        </p>
        <div className="cta">
          <a href="/join" className="btn btn-default btn-lg">
            Join a club
          </a>
          <a href="/visit" className="btn btn-outline btn-lg">
            Plan a visit
          </a>
        </div>
        <dl className="hero-facts">
          <div>
            <dt>Where</dt>
            <dd>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                Agona Wiamoase, Ashanti Region
              </a>
            </dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Ghana Library Authority branch</dd>
          </div>
          <div>
            <dt>Clubs</dt>
            <dd>Coding · Robotics · Reading, free to join</dd>
          </div>
        </dl>
        <div className="hero-trust">
          <span className="hero-trust-label">Supported by</span>
          <ul>
            {partners.slice(0, 2).map((p) => (
              <li key={p.name}>
                <Image src={p.logo} alt={p.name} width={51} height={40} sizes="51px" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
