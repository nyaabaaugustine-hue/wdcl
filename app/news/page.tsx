import type { Metadata } from "next";
import NewsIndex from "@/components/NewsIndex";
import { newsSorted } from "@/lib/news";

export const metadata: Metadata = {
  title: "News & Stories | Wiamoase Diaspora Public Library",
  description:
    "Sourced news and stories from the Wiamoase Diaspora Public Library: STEM lab handovers, exhibitions, skills training and community milestones since 2022.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News & Stories | Wiamoase Diaspora Public Library",
    description:
      "Sourced news and stories from the Wiamoase Diaspora Public Library in Agona Wiamoase, Ashanti Region.",
    type: "website",
  },
};

export default function NewsPage() {
  // Structured data so search engines can surface the dated articles.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News & Stories",
    description: "Sourced news and stories from the Wiamoase Diaspora Public Library.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: newsSorted.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `/news/${p.id}`,
        name: p.title,
        datePublished: p.date,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsIndex />
    </>
  );
}