"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import {
  featuredPost,
  formatNewsDate,
  newsCategories,
  newsSorted,
  type NewsCategory,
} from "@/lib/news";

type Filter = "All" | NewsCategory;

function isFilter(v: string | null): v is Filter {
  return v === "All" || (v !== null && (newsCategories as readonly string[]).includes(v));
}

export default function NewsIndex() {
  const [filter, setFilter] = useState<Filter>("All");

  // restore ?category= from the URL once on mount; keep the URL in sync after
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("category");
    if (isFilter(cat)) setFilter(cat);
  }, []);

  function apply(c: Filter) {
    setFilter(c);
    try {
      const url = new URL(window.location.href);
      if (c === "All") url.searchParams.delete("category");
      else url.searchParams.set("category", c);
      window.history.replaceState(null, "", url);
    } catch {
      /* URL API unavailable */
    }
  }

  const posts = useMemo(
    () => (filter === "All" ? newsSorted : newsSorted.filter((p) => p.category === filter)),
    [filter],
  );

  // The featured story stays the hero regardless of filter, unless the filter
  // excludes its category — then it appears in the grid instead.
  const featuredVisible = filter === "All" || featuredPost.category === filter;
  const rest = posts.filter((p) => p.id !== (featuredVisible ? featuredPost.id : ""));

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", newsSorted.length]]);
    for (const p of newsSorted) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="kente-inline" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p className="eyebrow">News &amp; stories</p>
          <h1>What&apos;s happened at the centre.</h1>
          <p className="lead muted">
            Milestones, openings, exhibitions and training — reported and sourced. Every story here links back to the
            original report so you can read it at the source.
          </p>
        </div>
      </section>

      {featuredVisible ? (
        <section className="section-tight">
          <div className="container">
            <Link className="feature" href={`/news/${featuredPost.id}`}>
              <div className="feature-media">
                <Photo
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt}
                  ratio="16-9"
                  priority
                  sizes="(max-width: 900px) 100vw, 55vw"
                />
                <span className="feature-flag">
                  <Icon name="heart" />
                  Featured
                </span>
              </div>
              <div className="feature-body">
                <div className="post-meta">
                  <span className="cat cat-stem">{featuredPost.category}</span>
                  <time dateTime={featuredPost.date}>{formatNewsDate(featuredPost.date)}</time>
                  <span className="dot-sep" aria-hidden="true">
                    ·
                  </span>
                  <span>{featuredPost.readMinutes} min read</span>
                </div>
                <h2>{featuredPost.title}</h2>
                <p className="muted">{featuredPost.dek}</p>
                <span className="read-more">
                  Read the full story <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className={featuredVisible ? "band" : undefined}>
        <div className="container">
          <div className="news-head">
            <div className="heading flush">
              <p className="eyebrow">Archive</p>
              <h2>All stories</h2>
            </div>
            <div className="filters" role="group" aria-label="Filter stories by category">
              {(["All", ...newsCategories] as Filter[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip${filter === c ? " on" : ""}`}
                  aria-pressed={filter === c}
                  onClick={() => apply(c)}
                >
                  {c}
                  <span className="chip-n">{counts.get(c) ?? 0}</span>
                </button>
              ))}
              {filter !== "All" ? (
                <button type="button" className="chip chip-clear" onClick={() => apply("All")}>
                  Clear filters ✕
                </button>
              ) : null}
            </div>
          </div>

          <p className="sr-only" role="status">
            {posts.length} {posts.length === 1 ? "story" : "stories"}
            {filter === "All" ? "" : ` in ${filter}`}
          </p>

          {rest.length === 0 ? (
            <div className="empty-note">
              <Icon name="book" size={26} />
              <p className="muted">No other stories in {filter} yet.</p>
              <button type="button" className="chip" onClick={() => apply("All")}>
                View all stories
              </button>
            </div>
          ) : (
            <div className="news-grid">
              {rest.map((p, i) => (
                <article className="post-card" key={p.id}>
                  <Link className="post-media" href={`/news/${p.id}`} tabIndex={-1} aria-hidden="true">
                    <Photo src={p.image} alt="" ratio="16-10" sizes="(max-width: 700px) 100vw, 33vw" />
                  </Link>
                  <div className="post-body">
                    <div className="post-meta">
                      <span className={`cat cat-${p.category.toLowerCase()}`}>{p.category}</span>
                      <time dateTime={p.date}>{formatNewsDate(p.date)}</time>
                    </div>
                    <h3>
                      <Link href={`/news/${p.id}`}>{p.title}</Link>
                    </h3>
                    <p className="muted">{p.dek}</p>
                    <div className="post-foot">
                      <span className="muted">{p.readMinutes} min read</span>
                      <Link className="read-more" href={`/news/${p.id}`}>
                        Read <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Follow along</p>
              <h2>News from the centre, on Facebook.</h2>
              <p>
                The library team posts updates, club photos and event notices on its Facebook page. That is the
                fastest way to hear what is on this week.
              </p>
            </div>
            <div>
              <ul>
                <li>
                  <Icon name="check" />
                  Club sessions and showcases
                </li>
                <li>
                  <Icon name="check" />
                  Visiting hours and closures
                </li>
                <li>
                  <Icon name="check" />
                  Appeals for books and equipment
                </li>
              </ul>
              <a
                className="btn btn-lg"
                href="https://www.facebook.com/people/Wiamoase-Diaspora-Public-Library/100086561113171/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the Facebook page
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}