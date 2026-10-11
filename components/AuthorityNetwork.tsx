import Link from "next/link";
import Icon from "./Icon";
import { AUTHORITY_URL, authorityFacts, authorityServices, authorityVision } from "@/lib/authority";

/**
 * Two sections about the Ghana Library Authority, the national network this
 * library belongs to. Everything here describes the Authority as a whole.
 */
export default function AuthorityNetwork() {
  return (
    <>
      <section id="network" className="band">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">The national network</p>
            <h2>Part of something bigger.</h2>
            <p className="muted">
              Wiamoase is one of the public libraries run by the Ghana Library Authority, the
              national agency that has served readers across Ghana for more than seventy years.
            </p>
          </div>

          <div className="stats">
            {authorityFacts.map((f) => (
              <div className="stat" key={f.value}>
                <b>{f.value}</b>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          <div className="callout">
            <Icon name="book" size={22} />
            <div>
              <b>The Authority&apos;s vision</b>
              <span className="muted">{authorityVision}</span>
            </div>
          </div>

          <div className="btn-row u-mt24">
            <a className="btn btn-outline" href={AUTHORITY_URL} target="_blank" rel="noopener noreferrer">
              Visit the Authority&apos;s website
              <Icon name="arrow" size={16} />
            </a>
            <Link className="btn btn-outline" href="/books">
              Its free digital library
            </Link>
          </div>
        </div>
      </section>

      <section id="authority-services">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Across the network</p>
            <h2>What the Authority offers.</h2>
            <p className="muted">
              These are the services the Ghana Library Authority provides nationwide. What is
              available differs from branch to branch, so ask the Wiamoase team what you can use here.
            </p>
          </div>

          <div className="role-grid">
            {authorityServices.map((s) => (
              <article className="role-card" key={s.title}>
                <span className="icon-box" aria-hidden="true">
                  <Icon name={s.icon} size={20} />
                </span>
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
