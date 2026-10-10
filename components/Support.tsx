import Link from "next/link";
import Icon from "./Icon";
import FeatureIcon from "./FeatureIcon";
import Reveal from "./Reveal";
import { visitPhoto } from "@/lib/data";

const ways = [
  {
    icon: "book",
    title: "Give books & learning materials",
    text: "Books, shelves and club supplies go straight to the reading room and clubs.",
    href: "/donate",
    cta: "Ways to give",
  },
  {
    icon: "users",
    title: "Mentor a club",
    text: "Two hours a week is enough. Coding, robotics or reading, from abroad or on site.",
    href: "/volunteer",
    cta: "See volunteer roles",
  },
  {
    icon: "heart",
    title: "Partner on STEM & literacy",
    text: "Fund a programme or piece of equipment, with scope and reporting agreed up front.",
    href: "/partners",
    cta: "Partnerships",
  },
] as const;

type Props = {
  /** The "Small acts of kindness" card at the foot of the panel. */
  showSmallActs?: boolean;
  /** Decorative background photograph (defaults to the centre photo). */
  photo?: string;
};

export default function Support({ showSmallActs = true, photo = visitPhoto }: Props) {
  return (
    <section className="gv-support" aria-labelledby="sup-h">
      <div className="gv-bg" aria-hidden="true" style={{ backgroundImage: `url(${photo})` }} />
      <div className="container">
        <div className="gv-grid">
          <div className="gv-copy">
            <p className="gv-eyebrow">Support the centre</p>
            <h2 id="sup-h">Help keep the doors open.</h2>
            <p className="gv-lead">
              The centre was built by citizens abroad and runs on the goodwill of people who care about it.
              Partners, volunteers and book donors are all welcome.
            </p>
            <div className="gv-cta">
              <Link href="/donate" className="gv-btn gv-btn--gold">
                Ways to give
                <Icon name="arrow" size={18} />
              </Link>
              <Link href="/volunteer" className="gv-btn gv-btn--ghost">
                Become a volunteer
              </Link>
            </div>
          </div>

          <ul className="gv-ways">
            {ways.map((w, i) => (
              <li key={w.title}>
                <Reveal delay={i * 80}>
                  <Link href={w.href} className="gv-way">
                    <span className="gv-icon" aria-hidden="true">
                      <FeatureIcon name={w.icon} size={28} />
                    </span>
                    <span className="gv-way-body">
                      <b>{w.title}</b>
                      <span>{w.text}</span>
                    </span>
                    <span className="gv-go" aria-label={w.cta}>
                      <Icon name="arrow" size={18} />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {showSmallActs && (
          <div className="gv-small">
            <div>
              <p className="gv-small-eyebrow">Small acts of kindness</p>
              <h3>Little gifts, big difference.</h3>
              <p>
                Not every gift is a building. A book, a shelf, a set of club materials — small contributions from
                many people keep the centre growing. Tell us what you&apos;d like to support and we&apos;ll match it
                to a need.
              </p>
            </div>
            <a
              href="/#visit"
              className="gv-btn gv-btn--solid"
              data-dialog="visit"
              data-topic="Donations & partnerships"
            >
              Tell us what you&apos;d like to give
              <Icon name="arrow" size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
