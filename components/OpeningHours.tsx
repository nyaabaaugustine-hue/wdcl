import Icon from "./Icon";
import { FACEBOOK_URL } from "@/lib/data";
import { libraryInfo } from "@/lib/library";

/**
 * Opening hours and contact card. Reads lib/library.ts: until real hours are filled in,
 * it says so plainly and points people to the message form.
 */
export default function OpeningHours() {
  const { hours, phone, email, whatsapp } = libraryInfo;
  return (
    <div className="lx-hours">
      <p className="eyebrow">Opening hours</p>
      {hours && hours.length ? (
        <dl>
          {hours.map((h) => (
            <div key={h.day}>
              <dt>{h.day}</dt>
              <dd>{h.time}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="lx-hours-tbc">
          <span className="lx-chip tbc">To be confirmed</span>
          <p className="muted">
            Opening hours are still being confirmed. Please send a message before you make a long trip.
          </p>
        </div>
      )}

      <ul className="lx-contact">
        {phone ? (
          <li>
            <Icon name="phone" size={16} />
            <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
          </li>
        ) : null}
        {email ? (
          <li>
            <Icon name="mail" size={16} />
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        ) : null}
        {whatsapp ? (
          <li>
            <Icon name="phone" size={16} />
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
        ) : null}
        <li>
          <Icon name="facebook" size={16} />
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
            Message us on Facebook
          </a>
        </li>
      </ul>

      <a className="btn btn-default btn-block" href="/contact" data-dialog="visit" data-topic="Ask a librarian">
        Send a message
      </a>
    </div>
  );
}
