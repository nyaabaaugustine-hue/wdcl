import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wiamoase Diaspora Public Library",
    short_name: "Wiamoase Library",
    description:
      "A community library and Robotics & ICT Centre in Agona Wiamoase, Ashanti Region, built by Wiamoase citizens abroad.",
    start_url: "/",
    display: "standalone",
    background_color: "#FCFAF8",
    theme_color: "#21503E",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
