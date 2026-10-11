import Link from "next/link";
import Icon from "./Icon";
import { digitalLibrary as d } from "@/lib/digitalLibrary";

/**
 * Digital library section. On the homepage it links through to /books;
 * on /books itself (home={false}) the link is left out.
 */
export default function DigitalLibrary({ home = true }: { home?: boolean }) {
  return (
    <section id="digital-library" className="dl">
      <div className="container">
        <div className="dl-grid">
          <div>
            <div className="heading">
              <p className="eyebrow">Digital library</p>
              <h2>Thousands of free books, on your phone.</h2>
              <p className="muted">
                Wiamoase is a branch of the Ghana Library Authority, so you can join its free digital
                library: e-books, audiobooks and educational videos, wherever you have a data
                connection.
              </p>
            </div>

            <ol className="dl-steps">
              {d.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <b>{s.title}</b>
                    <span className="muted">{s.text}</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="dl-stores">
              <a className="dl-store" href={d.appStoreUrl} target="_blank" rel="noopener noreferrer">
                <span>Download on the</span>
                <b>App Store</b>
              </a>
              <a className="dl-store" href={d.playStoreUrl} target="_blank" rel="noopener noreferrer">
                <span>Find it on</span>
                <b>Google Play</b>
              </a>
              {home ? (
                <Link className="btn btn-outline btn-lg" href="/books">
                  More about the digital library
                  <Icon name="arrow" size={16} />
                </Link>
              ) : null}
            </div>

            <p className="dl-note muted">
              The Ghana Library app is run by the Ghana Library Authority, not by our centre. For
              help with an account, email{" "}
              <a href={`mailto:${d.supportEmail}`}>{d.supportEmail}</a>.
            </p>
          </div>

          <div className="dl-formats">
            {d.formats.map((f) => (
              <article className="dl-format" key={f.title}>
                <span className="icon-box" aria-hidden="true">
                  <Icon name={f.icon} size={20} />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p className="muted">{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
