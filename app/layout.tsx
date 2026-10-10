import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DialogHost from "@/components/DialogHost";
import FloatingSocial from "@/components/FloatingSocial";
import { visitPhoto } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-serif" });

// Set NEXT_PUBLIC_SITE_URL (for example https://your-domain.org) when the site goes live,
// so link previews and canonical URLs use the real address.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_TITLE = "Wiamoase Diaspora Public Library | Agona Wiamoase, Ashanti Region";
const SITE_DESCRIPTION =
  "The Wiamoase Diaspora Public Library: a branch of the Ghana Library Authority in the Ashanti Region, built by Wiamoase citizens abroad, with a community library, Robotics & ICT Centre and conference hall.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Wiamoase Diaspora Public Library",
    locale: "en_GH",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: visitPhoto, alt: "The Wiamoase Diaspora Public Library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [visitPhoto],
  },
};

// Runs before paint so the saved or system theme is applied without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          {/* keep JS-disabled pages fully visible even with .reveal present */}
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. ClickUp) inject
          class/style onto <body> before React hydrates. */}
      <body suppressHydrationWarning>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        <div className="kente" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <Header />
        <main id="top">{children}</main>
        <Footer />
        <DialogHost />
        <FloatingSocial />
      </body>
    </html>
  );
}