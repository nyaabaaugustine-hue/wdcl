import Image from "next/image";
import Reveal from "./Reveal";
import { GoogleSummary, Stars } from "./GoogleReviews";
import { voices, type Voice } from "@/lib/voices";

function Tile({ v, delay }: { v: Voice; delay: number }) {
  return (
    <Reveal className={`tl-c tl-${v.theme}${v.large ? " tl-lg" : ""} av-tile`} delay={delay}>
      <div>
        <Stars />
        <p className="tl-q">“{v.quote}”</p>
      </div>
      <footer>
        <span className="tl-av">
          <Image src={v.img} alt="" width={44} height={44} sizes="44px" />
        </span>
        <span className="tl-who">
          <b>Name to be added</b>
          <span>{v.role}</span>
        </span>
      </footer>
    </Reveal>
  );
}

export default function AboutVoices() {
  const [feature, ...rest] = voices;
  return (
    <section className="band" id="voices">
      <div className="container">
        <div className="heading av-head">
          <div className="kente-inline" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p className="eyebrow">In their words</p>
          <h2>What the community says.</h2>
          <p className="muted">
            Sample voices for layout only — real comments will be confirmed with members and visitors before
            publishing.
          </p>
        </div>
        <GoogleSummary />
        <div className="av-grid">
          <Tile v={feature} delay={0} />
          <div className="av-side">
            <Tile v={rest[0]} delay={120} />
            <Tile v={rest[1]} delay={200} />
          </div>
        </div>
        <p className="muted tl-note">No real testimonials are published yet — this is a placeholder layout.</p>
      </div>
    </section>
  );
}