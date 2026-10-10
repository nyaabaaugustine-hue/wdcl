import Icon from "./Icon";
import Photo from "./Photo";
import { glance, MAP_URL } from "@/lib/data";

const DIRECTOR_PORTRAIT = {
  src: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791467278/steven_rimqjb.jpg",
  alt: "Portrait of Mr Stephen Adu, Library Director",
};

export default function Overview() {
  return (
    <section id="overview" className="band">
      <div className="container">
        <div className="heading">
          <div className="kente-inline" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p className="eyebrow">Overview</p>
          <h2>The Wiamoase Diaspora Public Library</h2>
          <p className="muted">
            A community library, learning centre and STEM hub for Wiamoase and the surrounding communities.
          </p>
        </div>

        <div className="ov-grid">
          <div className="ov-story">
            <p className="ov-lead">
              The library stands at <b>Agona Wiamoase</b> in the Sekyere South District of Ghana&apos;s Ashanti
              Region, and operates as a branch of the <b>Ghana Library Authority</b>.
            </p>

            <p>
              It was established by <b>Wiamoase Citizens in the Diaspora</b>, a union of people from the town now
              living abroad. The group formed for solidarity, and also to pool resources for projects at home. The
              library sits inside a two-storey Learning Development Centre that also houses a conference centre and
              offices, built from members&apos; voluntary contributions at a reported cost of about{" "}
              <b>US$500,000</b>.
            </p>

            <div className="ov-point">
              <Icon name="robot" />
              <div>
                <p className="eyebrow">Nov 2024 · Sponsorship</p>
                <p>
                  The library&apos;s ICT centre was refurbished and re-equipped by the <b>MTN Ghana Foundation</b>{" "}
                  as a Robotics and ICT Centre — giving students and residents access to computers, robotics
                  equipment and AI tools, with training from basic computer literacy to programming and robotics.
                </p>
              </div>
            </div>

            <div className="ov-note">
              <p className="eyebrow">The town</p>
              <p>
                Wiamoase is an ancient Ashanti town, widely associated with the legendary priest{" "}
                <b>Okomfo Anokye</b>, and is home to Okomfo Anokye Senior High School and a Seventh-day Adventist
                hospital.
              </p>
            </div>

            <div className="callout">
              <Icon name="heart" />
              <div>
                <b>Inclusive by design</b>
                <span className="muted">
                  The diaspora group has said the centre will advance the development of children with special needs
                  from the town.
                </span>
              </div>
            </div>
          </div>

          <aside className="ov-aside">
            <div className="card glance-card">
              <div className="kente" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="glance-director">
                <Photo
                  src={DIRECTOR_PORTRAIT.src}
                  alt={DIRECTOR_PORTRAIT.alt}
                  ratio="1-1"
                  sizes="72px"
                />
                <p className="glance-director-cap">
                  <span className="glance-director-name">Mr Stephen Adu</span>
                  <span className="glance-director-role">Library Director</span>
                </p>
              </div>
              <div className="card-header">
                <h3 className="card-title">At a glance</h3>
              </div>
              <div className="card-content">
                <dl className="facts">
                  {glance.map(([k, v]) => (
                    <div className="fact" key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  className="btn btn-default btn-block u-mt16"
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="pin" size={16} />
                  View Wiamoase on map
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}