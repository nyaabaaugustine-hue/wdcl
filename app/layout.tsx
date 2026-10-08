import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DialogHost from "@/components/DialogHost";
import BackTop from "@/components/BackTop";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Wiamoase Diaspora Public Library | Agona Wiamoase, Ashanti Region",
  description:
    "The Wiamoase Diaspora Public Library: a branch of the Ghana Library Authority in the Ashanti Region, built by Wiamoase citizens abroad, with a community library, Robotics & ICT Centre and conference hall.",
};

// Runs before paint so the saved or system theme is applied without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
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
        <BackTop />
      </body>
    </html>
  );
}