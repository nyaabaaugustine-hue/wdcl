import Photo from "./Photo";
import Reveal from "./Reveal";
import { storyPhoto, timeline } from "@/lib/data";

export default function Story() {
  return (
    <section id="story">
      <div className="container">
        <div className="heading">
          <p className="eyebrow">Our story</p>
          <h2>From a diaspora union to a digital hub.</h2>
        </div>
        <div className="story-grid">
          <div className="timeline">
            {timeline.map((t, i) => (
              <Reveal className="tl" delay={i * 70} key={t.when}>
                <span className="when">{t.when}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </Reveal>
            ))}
          </div>
          <Photo
            src={storyPhoto.src}
            alt={storyPhoto.alt}
            caption={storyPhoto.caption}
            ratio="3-2"
            sizes="(max-width: 900px) 100vw, 38vw"
          />
        </div>
      </div>
    </section>
  );
}