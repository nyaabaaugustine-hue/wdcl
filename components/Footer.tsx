import Icon from "./Icon";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import { FACEBOOK_URL } from "@/lib/data";

const LOGO_SRC =
  "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791212792/WIAMOASE_DIASPORA_PUBLIC_LIBRARY_-_Monochrome_Version_dcg8ge.png";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="fcols">
          <div>
            <a href="/" className="logo flogo" aria-label="Wiamoase Diaspora Library — home">
              <span className="logo-img">
                <Image src={LOGO_SRC} alt="" fill sizes="180px" />
              </span>
            </a>
            <p className="muted fblurb">
              A branch of the Ghana Library Authority, built by Wiamoase Citizens in the Diaspora.
            </p>
            <div className="footer-cta">
              <a href="/volunteer" className="btn btn-outline btn-sm" data-dialog="volunteer">
                Become a Volunteer
              </a>
              <a
                href="/#visit"
                className="btn btn-outline btn-sm"
                data-dialog="visit"
                data-topic="Donations & partnerships"
              >
                Donate Now
              </a>
              <a href="/#visit" className="btn btn-outline btn-sm" data-dialog="visit">
                Visit
              </a>
            </div>
            <div className="footer-nl">
              <h2>Newsletter</h2>
              <p className="muted">Occasional news from the centre. No spam.</p>
              <NewsletterForm />
            </div>
          </div>
          <nav aria-label="Library">
            <h2>Library</h2>
            <a href="/#overview">Overview</a>
            <a href="/about">About</a>
            <a href="/#facilities">Facilities</a>
            <a href="/#story">Our story</a>
            <a href="/clubs">Clubs</a>
            <a href="/programs">Our Programs</a>
            <a href="/gallery">Gallery</a>
          </nav>
          <nav aria-label="Get involved">
            <h2>Get involved</h2>
            <a href="/news">News &amp; stories</a>
            <a href="/sponsors">Sponsors</a>
            <a href="/partners">Partners</a>
            <a href="/volunteer">Volunteer</a>
          </nav>
          <nav aria-label="Connect">
            <h2>Connect</h2>
            <a href="/#visit">Visit &amp; contact</a>
            <a href="/contact">Email us</a>
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
