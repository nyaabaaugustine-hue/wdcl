import Image from "next/image";
import HeroSlider from "./HeroSlider";
import { heroBackdrop, stats } from "@/lib/data";

export default function Hero() {
  return (
    <section className="hero">
      <Image
        className="hero-bg"
        src={heroBackdrop.full}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="low"
      />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="container">
        <div className="kente-inline" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <a href="#facilities" className="badge badge-secondary">
          <span className="dot" /> New: Robotics &amp; ICT Centre, powered by MTN Ghana Foundation →
        </a>
        <h1>
          A library built by a town&apos;s <span>children abroad.</span>
        </h1>
        <p className="lead">
          The Wiamoase Diaspora Public Library is a branch of the Ghana Library Authority in Ashanti, funded by
          Wiamoase citizens living overseas for the people back home.
        </p>
        <div className="cta">
          <a href="#overview" className="btn btn-default btn-lg">
            Read the overview
          </a>
          <a href="#clubs" className="btn btn-outline btn-lg">
            Explore the clubs
          </a>
        </div>
        <div className="stats">
          {stats.map((s) => (
            <a className="stat" href={s.href} key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </a>
          ))}
        </div>

        <HeroSlider />
      </div>
    </section>
  );
}