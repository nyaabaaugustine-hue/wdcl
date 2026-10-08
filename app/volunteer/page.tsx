import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import { volunteerRoles, heroPhotos, visitPhoto } from "@/lib/data";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Volunteer | Wiamoase Diaspora Public Library",
  description:
    "Mentor a coding, robotics or reading club, host a community workshop, or help with outreach and donations at the Wiamoase Diaspora Public Library.",
};

export default function VolunteerPage() {
  const remote = volunteerRoles.filter((r) => r.remote);
  const onSite = volunteerRoles.filter((r) => !r.remote);

  return (
    <>
      <PageHero
        eyebrow={
          <nav className="eyebrow crumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Volunteer</span>
          </nav>
        }
        title="Two hours a week is genuinely enough."
        lead="The clubs run because members abroad and in the town give a couple of hours each week. You do not need to be a qualified teacher — you need to be willing to show up."
        image={visitPhoto}
        priority
      />

      <section className="section-tight">
        <div className="container">
          <div className="heading">
            <p className="eyebrow">Remote &amp; diaspora-friendly</p>
            <h2>Roles you can do from abroad.</h2>
            <p className="muted">
              These can be done remotely for most of the year, which suits diaspora members who cannot travel often.
            </p>
          </div>
          <div className="role-grid">
            {remote.map((r) => (
              <article className="role-card" key={r.title}>
                <span className="icon-box" aria-hidden="true">
                  <Icon name={r.icon} />
                </span>
                <h3>{r.title}</h3>
                <span className="badge badge-brand">{r.commitment}</span>
                <p className="muted">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="overview">
            <div>
              <div className="heading">
                <p className="eyebrow">On site</p>
                <h2>Roles at the centre.</h2>
                <p className="muted">
                  These need you in Agona Wiamoase. If you are planning a trip home, they are the most useful way to
                  spend a few hours of it.
                </p>
              </div>
              <div className="role-grid">
                {onSite.map((r) => (
                  <article className="role-card" key={r.title}>
                    <span className="icon-box" aria-hidden="true">
                      <Icon name={r.icon} />
                    </span>
                    <h3>{r.title}</h3>
                    <span className="badge badge-secondary">{r.commitment}</span>
                    <p className="muted">{r.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <Photo
                src={heroPhotos[2].src}
                alt={heroPhotos[2].alt}
                caption="Mentors are matched to clubs before each term"
                ratio="4-3"
                sizes="(max-width: 900px) 100vw, 40vw"
              />
              <div className="callout">
                <Icon name="check" />
                <div>
                  <b>How matching works</b>
                  <span className="muted">
                    Tell us which clubs interest you and how many hours you can commit. The library team pairs
                    mentors with a club coordinator before each term starts.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Next step</p>
              <h2>Say which club you can help.</h2>
              <p>
                One short message is enough to start. We will follow up with the club schedule and the coordinator's
                details.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <Icon name="check" />
                  Coding, robotics and reading club mentoring
                </li>
                <li>
                  <Icon name="check" />
                  Workshop hosting and outreach
                </li>
                <li>
                  <Icon name="check" />
                  Book and equipment drives
                </li>
              </ul>
              <a
                className="btn btn-lg"
                href="/?topic=Volunteering#visit"
                data-dialog="volunteer"
              >
                Become a Volunteer
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}