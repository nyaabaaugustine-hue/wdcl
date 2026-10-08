import Image from "next/image";
import Icon from "./Icon";
import { galleryImages } from "@/lib/data";

const COPIES = 3;

type TileProps = { img: (typeof galleryImages)[number]; decorative?: boolean };

function Tile({ img, decorative }: TileProps) {
  return (
    <figure className={`gstrip-tile${decorative ? " is-copy" : ""}`} aria-hidden={decorative || undefined}>
      <Image
        src={img.src}
        alt={decorative ? "" : img.alt}
        width={720}
        height={540}
        sizes="340px"
        className="gstrip-img"
      />
      <figcaption>{img.caption}</figcaption>
    </figure>
  );
}

export default function GalleryStrip() {
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
      <div className="gstrip-viewport">
        <div className="gstrip-track">
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            galleryImages.map((img) => (
              <Tile key={`${copy}-${img.alt}`} img={img} decorative={copy > 0} />
            )),
          )}
        </div>
      </div>
    </div>
  );
}