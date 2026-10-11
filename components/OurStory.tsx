import Icon from "./Icon";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { glance, MAP_URL, storyPhoto, timeline } from "@/lib/data";

const DIRECTOR_PORTRAIT = {
  src: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791467278/steven_rimqjb.jpg",
  alt: "Portrait of Mr Stephen Adusei, Library Director",
};

/**
 * Homepage "Overview" + "Our story" merged into one section so the page reaches
 * the facilities and clubs sooner. Keeps both old anchors (#overview, #story).
 * The old Overview / Story / DirectorWelcome components are untouched; flip
 * MERGED_STORY in app/page.tsx to bring the previous layout back.
 */
export default function OurStory() {
  return (
    <section id="story" className="our-story">
      <span id="overview" className="our-story-anchor" aria-hidden="true" />
      <div className="container">
        <div className="heading">
          <div className="kente-inline" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p className="eyebrow">Our story</p>
          <h2>A library built from abroad, for home.</h2>
          <p className="muted">
            A community library, learning centre and STEM hub for Wiamoase and the surrounding communities.
          </p>
        </div>

        <div className="ov-grid">
          <div className="ov-story">
            <p className="ov-lead">
              The library stands at <b>Agona Wiamoase</b> in the Sekyere South District of Ghana&apos;s Ashanti
              Region, and operates as a branch of the <b>Ghana Library Authority</b>. It was established by{" "}
              <b>Wiamoase Citizens in the Diaspora</b>, a union of people from the town now living abroad.
            </p>

            <p>
              The group formed for solidarity, and also to pool resources for projects at home. The library sits
              inside a two-storey Learning Development Centre that also houses a conference centre and offices,
              built from members&apos; voluntary contributions at a reported cost of about <b>US$500,000</b>.
            </p>

            <div className="timeline our-story-timeline">
              {timeline.map((t, i) => (
                <Reveal className="tl" delay={i * 70} key={t.when}>
                  <span className="when">{t.when}</span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </Reveal>
              ))}
            </div>

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

          <aside className="ov-aside our-story-aside">
            <Photo
              src={storyPhoto.src}
              alt={storyPhoto.alt}
              caption={storyPhoto.caption}
              ratio="3-2"
              sizes="(max-width: 900px) 100vw, 38vw"
            />

            <div className="card glance-card">
              <div className="kente" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
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

            <a className="our-story-director" href="/about#director-welcome">
              <span className="our-story-director-photo">
                <Photo src={DIRECTOR_PORTRAIT.src} alt={DIRECTOR_PORTRAIT.alt} ratio="1-1" sizes="64px" />
              </span>
              <span className="our-story-director-text">
                <b>A word from the Director</b>
                <span>Mr Stephen Adusei, Library Director</span>
              </span>
              <Icon name="arrow" size={18} />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
