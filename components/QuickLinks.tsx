import Link from "next/link";
import Icon from "./Icon";
import { DEMO, libraryInfo } from "@/lib/library";

/**
 * A row of the four things visitors look for first: when it is open, how to join, asking a
 * question and finding a book. Sits right under the home page statistics.
 */
export default function QuickLinks() {
  const first = libraryInfo.hours?.[0];
  const hoursText = first ? `${first.day}, ${first.time}${DEMO ? " (demo)" : ""}` : "Hours to be confirmed";

  const tiles = [
    { icon: "clock", title: "Opening hours", text: hoursText, href: "/visit" },
    { icon: "users", title: "Become a member", text: "Free digital library today. Borrowing at the centre.", href: "/membership" },
    { icon: "mail", title: "Ask a librarian", text: "Send a question and we will reply.", href: "/ask" },
    { icon: "book", title: "Find a book", text: "Request a title and see reading lists.", href: "/collection" },
  ] as const;

  return (
    <section className="ql" aria-label="Quick links">
      <div className="container">
        <ul className="ql-grid">
          {tiles.map((t) => (
            <li key={t.title}>
              <Link href={t.href} className="ql-tile">
                <span className="icon-box" aria-hidden="true">
                  <Icon name={t.icon} size={20} />
                </span>
                <span className="ql-body">
                  <b>{t.title}</b>
                  <span className="muted">{t.text}</span>
                </span>
                <span className="ql-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
