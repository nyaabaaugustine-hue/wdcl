import Image from "next/image";
import Icon from "./Icon";
import { galleryImages } from "@/lib/data";

/**
 * Static photo mosaic: one large photo and four smaller ones. Replaces the
 * endlessly scrolling strip, which repeated every photo three times in the
 * page and was hard to look at.
 */
export default function GalleryStrip() {
  const tiles = galleryImages.slice(0, 5);

  return (
    <div className="gstrip" aria-labelledby="gstrip-h">
      <div className="gstrip-top">
        <div>
          <p className="eyebrow">In pictures</p>
          <h2 id="gstrip-h">A look around.</h2>
        </div>
        <a className="card-link" href="/gallery">
          Full gallery <Icon name="arrow" size={14} />
        </a>
      </div>
      <div className="gmosaic">
        {tiles.map((img, i) => (
          <figure className={`gm-tile${i === 0 ? " gm-lead" : ""}`} key={img.src}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={i === 0 ? "(max-width: 700px) 100vw, 50vw" : "(max-width: 700px) 50vw, 25vw"}
              className="gm-img"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
