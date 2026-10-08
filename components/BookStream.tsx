"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Book = {
  title: string;
  author: string;
  year: string;
  blurb: string;
  a: string;
  b: string;
};

const books: Book[] = [
  {
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    year: "1958",
    blurb: "A novel of life, custom and change in south-eastern Nigeria on the eve of colonial rule.",
    a: "#1f6b4a",
    b: "#0e3d2b",
  },
  {
    title: "The Beautiful Ones Are Not Yet Born",
    author: "Ayi Kwei Armah",
    year: "1968",
    blurb: "A Ghanaian clerk holds to his integrity in a city crowded with corruption.",
    a: "#b4543a",
    b: "#6e2d1e",
  },
  {
    title: "Purple Hibiscus",
    author: "Chimamanda Ngozi Adichie",
    year: "2003",
    blurb: "A quiet coming-of-age story set in a wealthy, strictly governed Nigerian family.",
    a: "#6d4aa7",
    b: "#3a2463",
  },
  {
    title: "Half of a Yellow Sun",
    author: "Chimamanda Ngozi Adichie",
    year: "2006",
    blurb: "Five lives braided together through the Biafran War.",
    a: "#c98a1b",
    b: "#7c5007",
  },
  {
    title: "The Joys of Motherhood",
    author: "Buchi Emecheta",
    year: "1979",
    blurb: "A classic satire of tradition, expectation and a mother's devotion in colonial Lagos.",
    a: "#a8407a",
    b: "#5e1f44",
  },
  {
    title: "The Concubine",
    author: "Elechi Amadi",
    year: "1966",
    blurb: "A tragic love story rooted in the folklore and village life of eastern Nigeria.",
    a: "#2b6f8e",
    b: "#123c52",
  },
  {
    title: "Ake: The Years of Childhood",
    author: "Wole Soyinka",
    year: "1981",
    blurb: "A Nobel laureate's memoir of a curious boyhood in the town of Ake.",
    a: "#3d7a2e",
    b: "#1c4213",
  },
  {
    title: "So Long a Letter",
    author: "Mariama Bâ",
    year: "1979",
    blurb: "A letter between two women in Dakar about marriage, friendship and independence.",
    a: "#c0563f",
    b: "#6f2a1c",
  },
  {
    title: "Homegoing",
    author: "Yaa Gyasi",
    year: "2016",
    blurb: "Two half-sisters in Ghana and the generations whose lives follow from theirs.",
    a: "#1f5f9e",
    b: "#0d3258",
  },
  {
    title: "Born on a Tuesday",
    author: "Elnathan John",
    year: "2015",
    blurb: "A boy's route through the streets of northern Nigeria, faith, and hard choices.",
    a: "#8e7a1e",
    b: "#51430a",
  },
];

const openLib = (b: Book) =>
  `https://openlibrary.org/search?q=${encodeURIComponent(`${b.title} ${b.author}`)}`;

function Cover({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <span
      className={`bs-cover${large ? " bs-cover-lg" : ""}`}
      style={{ ["--bk-a" as string]: book.a, ["--bk-b" as string]: book.b }}
      aria-hidden="true"
    >
      <span className="bs-cover-title">{book.title}</span>
      <span className="bs-cover-author">{book.author}</span>
    </span>
  );
}

export default function BookStream() {
  const [manual, setManual] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const paused = manual || openIdx !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIdx]);

  const open = (idx: number, el: HTMLElement) => {
    openerRef.current = el;
    setOpenIdx(idx);
  };

  const close = () => {
    setOpenIdx(null);
    openerRef.current?.focus();
  };

  const active = openIdx === null ? null : books[openIdx % books.length];
  const doubled = [...books, ...books];

  return (
    <section className="bs-sec" aria-labelledby="bs-title">
      <div className="container bs-head">
        <div className="heading">
          <div className="kente-inline" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p className="eyebrow">The shelf</p>
          <h2 id="bs-title">Books that never stop arriving.</h2>
          <p className="muted">
            A rolling shelf from our reading list — tap any book to pause it and open its details. Stock changes with
            the seasons; ask at the desk for what is on the shelf today.
          </p>
        </div>
        <div className="bs-controls">
          <button
            type="button"
            className="bs-toggle"
            aria-pressed={paused}
            onClick={() => setManual((v) => !v)}
          >
            {paused ? "▶ Resume shelf" : "❚❚ Pause shelf"}
          </button>
        </div>
      </div>

      <div className="bs-rail" data-paused={paused ? "true" : "false"}>
        <div className="bs-track">
          {doubled.map((b, i) => {
            const dup = i >= books.length;
            return (
              <button
                key={`${b.title}-${i}`}
                type="button"
                className="bs-book"
                aria-hidden={dup || undefined}
                tabIndex={dup ? -1 : undefined}
                onClick={(e) => !dup && open(i, e.currentTarget)}
              >
                <Cover book={b} />
                <span className="bs-meta">
                  <b>{b.title}</b>
                  <span>{b.author}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="bs-hint muted">Tap a book to pause the shelf and open it.</p>

      {active ? (
        <div className="bs-overlay" onClick={close} role="presentation">
          <div
            className="bs-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bs-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="kente-inline bs-dialog-kente" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <button type="button" className="bs-close" onClick={close} aria-label="Close book details">
              ✕
            </button>
            <div className="bs-dialog-grid">
              <Cover book={active} large />
              <div className="bs-dialog-body">
                <p className="eyebrow">
                  {active.year} · {active.author}
                </p>
                <h3 id="bs-dialog-title">{active.title}</h3>
                <p className="muted">{active.blurb}</p>
                <dl className="bs-facts">
                  <div>
                    <dt>Author</dt>
                    <dd>{active.author}</dd>
                  </div>
                  <div>
                    <dt>First published</dt>
                    <dd>{active.year}</dd>
                  </div>
                  <div>
                    <dt>Availability</dt>
                    <dd>Ask at the desk</dd>
                  </div>
                </dl>
                <div className="btn-row">
                  <Link className="btn btn-default" href="/contact">
                    Rent this book
                  </Link>
                  <a
                    className="btn btn-outline"
                    href={openLib(active)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read online
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
