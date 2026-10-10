import Link from "next/link";
import { newsPosts } from "@/lib/news";
import Photo from "./Photo";

const items = newsPosts.slice(0, 3);

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/**
 * Latest stories as a static grid. Replaces the auto-rotating carousel: all
 * three stories are visible at once, nothing moves on its own, and there are
 * no hidden-but-focusable links.
 */
export default function NewsStrip() {
  return (
    <div id="latest" className="ns-static">
      <div className="ns-static-head">
        <h3 className="ns-static-title">Latest news</h3>
        <Link className="card-link" href="/news">
          All stories <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="news-grid">
        {items.map((p) => (
          <article className="news-card" key={p.id}>
            <Link
              href={`/news/${p.id}`}
              className="news-card-media"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Photo
                src={p.image}
                alt=""
                ratio="16-10"
                sizes="(max-width: 900px) 100vw, 360px"
              />
            </Link>
            <div className="post-meta">
              <span className={`cat cat-${p.category.toLowerCase()}`}>{p.category}</span>
              <time dateTime={p.date}>{fmt(p.date)}</time>
              <span className="dot-sep" aria-hidden="true">
                ·
              </span>
              <span>{p.readMinutes} min read</span>
            </div>
            <h4 className="news-card-title">
              <Link href={`/news/${p.id}`}>{p.title}</Link>
            </h4>
            <p className="muted">{p.dek}</p>
            <Link className="read-more" href={`/news/${p.id}`}>
              Read the story <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
