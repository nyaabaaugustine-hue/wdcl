import type { MetadataRoute } from "next";

// No live domain confirmed yet, so no sitemap line is emitted.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
