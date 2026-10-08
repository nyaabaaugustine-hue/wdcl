import { stats } from "@/lib/data";

export default function StatsBand() {
  return (
    <section className="stats-band" aria-label="Key facts about the centre">
      <div className="container">
        <div className="stats">
          {stats.map((s) => (
            <a className="stat" href={s.href} key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
