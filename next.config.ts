import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Next 15's devtools segment-explorer intermittently throws
  // "Could not find the module ...#SegmentViewNode in the React Client Manifest",
  // which 500s dev requests. Dev-only tooling; disabling it keeps dev usable.
  devIndicators: false,
  // A stray package-lock.json in C:\Users\TGNE makes Next infer the wrong
  // workspace root; pin tracing to this project so builds are reproducible.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Sources are fetched from Unsplash at most 1600px wide, so stop
    // advertising the default 1920/2048/3840 candidates which would upscale.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;