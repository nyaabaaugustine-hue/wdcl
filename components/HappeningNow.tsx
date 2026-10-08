import NewsStrip from "./NewsStrip";
import GalleryStrip from "./GalleryStrip";

export default function HappeningNow() {
  return (
    <section className="happen" aria-labelledby="happen-h">
      <div className="container">
        <div className="heading happen-heading">
          <p className="eyebrow">Happening now</p>
          <h2 id="happen-h">Fresh news and a look around.</h2>
        </div>
        <NewsStrip />
        <GalleryStrip />
      </div>
    </section>
  );
}
