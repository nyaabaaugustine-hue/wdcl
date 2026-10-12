import Link from "next/link";
import Icon from "./Icon";
import { clubs } from "@/lib/data";

export default function UpcomingSessions() {
  return (
    <section className="upcoming" aria-labelledby="upcoming-heading">
      <div className="container">
        <div className="upcoming-head">
          <div className="heading">
            <p className="eyebrow">This week</p>
            <h2 id="upcoming-heading">Find your next learning session.</h2>
            <p className="muted">Three free clubs, with a place for beginners, families and curious young people.</p>
          </div>
          <Link className="btn btn-outline" href="/clubs">
            See all clubs <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="upcoming-grid">
          {clubs.map((club) => (
            <Link className="upcoming-card" href={`/clubs/${club.id}`} key={club.id}>
              <span className="upcoming-label">{club.label}</span>
              <h3>{club.title}</h3>
              <p className="muted">{club.meets}</p>
              <div className="upcoming-meta">
                <span>{club.time}</span>
                <span>{club.venue}</span>
              </div>
              <span className="read-more">Club details <Icon name="arrow" size={14} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
