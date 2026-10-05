import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import ReadingProgress from "@/components/ReadingProgress";
import ShareRow from "@/components/ShareRow";
import { newsPosts, newsSorted, formatNewsDate } from "@/lib/news";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = newsSorted.find((p) => p.id === slug);
  if (!post) return { title: "Story not found | Wiamoase Diaspora Public Library" };

  return {
    title: `${post.title} | Wiamoase Diaspora Public Library`,
    description: post.dek,
    alternates: { canonical: `/news/${post.id}` },
    openGraph: {
      title: post.title,
      description: post.dek,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default async function NewsArticle({ params }: Params) {
  const { slug } = await params;
  const post = newsSorted.find((p) => p.id === slug);
  if (!post) notFound();

  const related = newsSorted.filter((p) => p.id !== post.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.dek,
    datePublished: post.date,
    image: [post.image],
    articleSection: post.category,
    author: { "@type": "NewsMediaOrganization", name: post.source.name },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: post.source.name,
      url: post.source.url,
    },
    citation: [post.source.url, ...(post.alsoReported ?? []).map((a) => a.url)],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="article">
        <ReadingProgress />
        <header className="article-head">
          <div className="container">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/news">News &amp; stories</Link>
              <span aria-hidden="true">/</span>
              <span>{post.category}</span>
            </nav>
            <div className="post-meta">
              <span className={`cat cat-${post.category.toLowerCase()}`}>{post.category}</span>
              <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
              <span className="dot-sep" aria-hidden="true">
                ·
              </span>
              <span>{post.readMinutes} min read</span>
            </div>
            <h1>{post.title}</h1>
            <p className="lead muted">{post.dek}</p>
            <ShareRow title={post.title} />
          </div>
        </header>

        <div className="container">
          <div className="article-figure">
            <Photo
              src={post.image}
              alt={post.imageAlt}
              ratio="16-9"
              priority
              sizes="(max-width: 900px) 100vw, 1000px"
            />
            <p className="figure-credit">
              Photograph: Unsplash placeholder — pending approved library photography.
            </p>
          </div>

          <div className="article-body">
            <div className="prose">
              {post.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {post.pullQuote ? (
                <figure className="quote">
                  <blockquote>{post.pullQuote.text}</blockquote>
                  <figcaption className="muted">{post.pullQuote.attribution}</figcaption>
                </figure>
              ) : null}

              {post.people?.length ? (
                <section className="article-people">
                  <h2>People quoted</h2>
                  <ul>
                    {post.people.map((person) => (
                      <li key={person.name}>
                        <b>{person.name}</b>
                        <span className="muted">{person.role}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section className="source-box">
                <h2>Source</h2>
                <p>
                  This story was first reported by{" "}
                  <a href={post.source.url} target="_blank" rel="noopener noreferrer">
                    {post.source.name}
                  </a>{" "}
                  on {post.source.published}. Wiamoase Diaspora Public Library republishes the facts with attribution;
                  the original publisher holds all rights to the wording.
                </p>
                {post.alsoReported?.length ? (
                  <p className="muted">
                    Also reported by{" "}
                    {post.alsoReported.map((a, i) => (
                      <span key={a.url}>
                        {i > 0 ? ", " : ""}
                        <a href={a.url} target="_blank" rel="noopener noreferrer">
                          {a.name}
                        </a>
                      </span>
                    ))}
                    .
                  </p>
                ) : null}
              </section>
            </div>

            <aside className="article-aside">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Visit the centre</h2>
                </div>
                <div className="card-content">
                  <p className="muted">
                    Everything reported here happens in a building you can visit in Agona Wiamoase. Come and see the
                    labs, meet the mentors and join a session.
                  </p>
                  <a className="btn btn-default btn-block" href="/#visit">
                    Plan a visit
                  </a>
                  <a className="btn btn-outline btn-block u-mt8" href="/clubs">
                    See the clubs
                  </a>
                  <a className="back-top" href="#top">
                    ↑ Back to top
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <section className="band">
          <div className="container">
            <div className="heading">
              <div className="kente-inline" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <p className="eyebrow">Keep reading</p>
              <h2>More stories.</h2>
            </div>
            <div className="news-grid">
              {related.map((p) => (
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
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}