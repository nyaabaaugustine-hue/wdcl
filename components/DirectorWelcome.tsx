import Photo from "./Photo";

const DIRECTOR_PORTRAIT = {
  src: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791467278/steven_rimqjb.jpg",
  alt: "Portrait of Mr Stephen Adusei, Library Director",
};

type Props = {
  /** Optional portrait of the Director. Falls back to the approved portrait. */
  photo?: { src: string; alt: string };
};

export default function DirectorWelcome({ photo = DIRECTOR_PORTRAIT }: Props) {
  return (
    <section id="director-welcome" className="director-welcome">
      <div className="dw-bg" aria-hidden="true" />
      <div className="container dw-inner">
        <div className="kente-inline" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div className="dw-portrait">
          <Photo src={photo.src} alt={photo.alt} ratio="1-1" sizes="148px" />
          <p className="dw-portrait-cap">
            Mr Stephen Adusei <span aria-hidden="true">·</span> Library Director
          </p>
        </div>

        <p className="eyebrow">A word from the Director</p>

        <div className="dw-note">
          <p>
            To the sons and daughters of Wiamoase, wherever you are: this library is your gift to home.
            Every shelf, every book, every robotics kit carries the care of people who left this town but
            never left it behind. On behalf of the library and the community it serves, I welcome you — and
            I thank you.
          </p>
          <p>
            This is a place built for the children of Wiamoase: a reading room where stories begin, an ICT
            centre where ideas become code, a conference hall where the town gathers. It belongs to every
            pupil who walks through the door, and it exists because you believed in them.
          </p>
          <p>Come and see what your kindness has built. The doors are open.</p>
        </div>

        <footer className="dw-sign">
          <span className="dw-name">Mr Stephen Adusei</span>
          <span className="dw-role">Library Director, Wiamoase Diaspora Public Library</span>
        </footer>
      </div>
    </section>
  );
}
