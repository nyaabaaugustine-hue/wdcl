import Icon from "./Icon";

const items = [
  "Donate books and learning materials",
  "Volunteer as a club mentor",
  "Partner on STEM and literacy programmes",
];

export default function Support() {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="cta-card">
          <div>
            <p className="eyebrow">Support the centre</p>
            <h2>Help keep the doors open.</h2>
            <p>The community is building ways to sustain the centre. Partners, volunteers and book donors are welcome.</p>
          </div>
          <div>
            <ul>
              {items.map((t) => (
                <li key={t}>
                  <Icon name="check" />
                  {t}
                </li>
              ))}
            </ul>
            <a href="#visit" className="btn btn-lg">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
