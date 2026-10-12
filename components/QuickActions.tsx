import Link from "next/link";
import Icon from "./Icon";
import { ADDRESS, PLUS_CODE } from "@/lib/data";

const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=7.067%2C-1.533";

const actions = [
  {
    icon: "clock",
    label: "Opening hours",
    value: "To be confirmed",
    detail: "Message before you travel",
    href: "/visit#visit-facts",
  },
  {
    icon: "pin",
    label: "Find us",
    value: "Agona Wiamoase",
    detail: PLUS_CODE,
    href: DIRECTIONS_URL,
    external: true,
  },
  {
    icon: "users",
    label: "Join a club",
    value: "Coding, robotics or reading",
    detail: "Free to join",
    href: "/join",
  },
  {
    icon: "book",
    label: "Read online",
    value: "Free digital books",
    detail: "E-books, audiobooks and videos",
    href: "/books",
  },
] as const;

export default function QuickActions() {
  return (
    <section className="quick-actions" aria-labelledby="quick-actions-heading">
      <div className="container">
        <div className="quick-actions-head">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 id="quick-actions-heading">Everything you need for your next visit.</h2>
          </div>
          <p className="muted quick-actions-note">{ADDRESS}</p>
        </div>
        <div className="quick-actions-grid">
          {actions.map((action) => {
            const content = (
              <>
                <span className="quick-action-icon" aria-hidden="true">
                  <Icon name={action.icon} size={20} />
                </span>
                <span className="quick-action-copy">
                  <b>{action.label}</b>
                  <span>{action.value}</span>
                  <small>{action.detail}</small>
                </span>
                <Icon name="arrow" size={16} />
              </>
            );

            return action.external ? (
              <a className="quick-action" href={action.href} target="_blank" rel="noopener noreferrer" key={action.label}>
                {content}
              </a>
            ) : (
              <Link className="quick-action" href={action.href} key={action.label}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
