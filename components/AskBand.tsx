import Icon from "./Icon";
import { FACEBOOK_URL } from "@/lib/data";

/** Closing call-to-action: ask a librarian. Opens the contact pop-up with the topic preselected. */
export default function AskBand({
  title = "Still have a question?",
  text = "Send it to the library team and we will reply as soon as we can.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="band">
      <div className="container">
        <div className="cta-card">
          <div>
            <p className="eyebrow">Ask a librarian</p>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div>
            <ul>
              <li>
                <Icon name="check" />
                We reply as soon as we can
              </li>
              <li>
                <Icon name="check" />
                No question is too small
              </li>
              <li>
                <Icon name="check" />
                You can also message us on Facebook
              </li>
            </ul>
            <div className="btn-row">
              <a className="btn btn-lg" href="/contact" data-dialog="visit" data-topic="Ask a librarian">
                Ask a librarian
              </a>
              <a className="btn btn-lg btn-line" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
