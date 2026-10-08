import Icon from "./Icon";

const items = [
  "Donate books and learning materials",
  "Volunteer as a club mentor",
  "Partner on STEM and literacy programmes",
];

export default function Support() {
  return (
    <section className="support-band">
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
            <div className="support-actions">
              <a href="#visit" className="btn btn-lg" data-dialog="visit">
                Get in touch
              </a>
              <a href="/volunteer" className="btn btn-lg" data-dialog="volunteer">
                Become a Volunteer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
