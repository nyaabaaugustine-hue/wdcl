import Icon from "./Icon";
import { glance, MAP_URL } from "@/lib/data";

export default function Overview() {
  return (
    <section id="overview" className="band">
      <div className="container">
        <div className="heading">
          <p className="eyebrow">I · Overview</p>
          <h2>The Wiamoase Diaspora Public Library</h2>
          <p className="muted">
            A community library, learning centre and STEM hub for Wiamoase and the surrounding communities.
          </p>
        </div>
        <div className="overview">
          <div className="prose">
            <p>
              The Wiamoase Diaspora Public Library stands at Agona Wiamoase in the Sekyere South District of
              Ghana&apos;s Ashanti Region, and operates as a branch of the Ghana Library Authority.
            </p>
            <p>
              It was established by <b>Wiamoase Citizens in the Diaspora</b>, a union of people from the town now
              living abroad. The group formed for solidarity, and also to pool resources for projects at home. The
              library sits inside a two-storey Learning Development Centre that also houses a conference centre and
              offices, built from members&apos; voluntary contributions at a reported cost of about US$500,000.
            </p>
            <p>
              In November 2024 the library&apos;s ICT centre was refurbished and re-equipped by the MTN Ghana
              Foundation as a Robotics and ICT Centre, giving students and residents access to computers, robotics
              equipment and AI tools, with training that runs from basic computer literacy to programming and
              robotics.
            </p>
            <p className="muted">
              Wiamoase is an ancient Ashanti town, widely associated with the legendary priest Okomfo Anokye, and is
              home to Okomfo Anokye Senior High School and a Seventh-day Adventist hospital.
            </p>
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

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">At a glance</h3>
            </div>
            <div className="card-content">
              <div className="facts">
                {glance.map(([k, v]) => (
                  <div className="fact" key={k}>
                    <span>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
              <a
                className="btn btn-outline btn-sm u-mt16"
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Wiamoase on map
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
