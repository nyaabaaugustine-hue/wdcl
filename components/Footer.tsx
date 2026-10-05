import Icon from "./Icon";
import { FACEBOOK_URL } from "@/lib/data";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="fcols">
          <div>
            <a href="/" className="logo flogo">
              <i aria-hidden="true">W</i> Wiamoase Diaspora Library
            </a>
            <p className="muted fblurb">
              A branch of the Ghana Library Authority, built by Wiamoase Citizens in the Diaspora.
            </p>
          </div>
          <nav aria-label="Library">
            <h4>Library</h4>
            <a href="/#overview">Overview</a>
            <a href="/#facilities">Facilities</a>
            <a href="/#story">Our story</a>
            <a href="/clubs">Clubs</a>
            <a href="/gallery">Gallery</a>
          </nav>
          <nav aria-label="Get involved">
            <h4>Get involved</h4>
            <a href="/news">News &amp; stories</a>
            <a href="/sponsors">Sponsors</a>
            <a href="/partners">Partners</a>
            <a href="/volunteer">Volunteer</a>
          </nav>
          <nav aria-label="Connect">
            <h4>Connect</h4>
            <a href="/#visit">Visit &amp; contact</a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="facebook" size={15} />
              Facebook
            </a>
            <a href="/privacy">Privacy</a>
          </nav>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} Wiamoase Diaspora Public Library</span>
          <span>Agona Wiamoase, Ashanti, Ghana</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
