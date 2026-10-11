import { clubs } from "@/lib/data";
import { newsPosts } from "@/lib/news";

export type SearchEntry = {
  title: string;
  text: string;
  href: string;
  kind: "Page" | "Club" | "News";
  keywords?: string;
  popular?: boolean;
};

const pages: SearchEntry[] = [
  { title: "Home", text: "Wiamoase Diaspora Public Library", href: "/", kind: "Page", keywords: "start main" },
  { title: "About us", text: "Who we are, our story and our director's welcome.", href: "/about", kind: "Page", keywords: "history founders diaspora", popular: true },
  { title: "Services", text: "Everything the centre offers under one roof.", href: "/services", kind: "Page", keywords: "what we offer computers internet study", popular: true },
  { title: "Become a member", text: "Library membership and the free digital library card.", href: "/membership", kind: "Page", keywords: "join library card borrow register", popular: true },
  { title: "Find a book", text: "Request a title, browse the shelves and reading lists.", href: "/collection", kind: "Page", keywords: "catalogue search books collection shelves reading list new arrivals", popular: true },
  { title: "Ask a librarian", text: "Send a question or request a book.", href: "/ask", kind: "Page", keywords: "help question enquiry whatsapp", popular: true },
  { title: "Events and weekly timetable", text: "What is on this week and upcoming events.", href: "/events", kind: "Page", keywords: "calendar schedule timetable programme", popular: true },
  { title: "Clubs", text: "Coding, Robotics and Reading clubs.", href: "/clubs", kind: "Page", keywords: "coding robotics reading stem", popular: true },
  { title: "Children and teens", text: "Clubs and learning by age group.", href: "/kids", kind: "Page", keywords: "kids children teens school students parents" },
  { title: "Digital library", text: "Free e-books, audiobooks and videos in the Ghana Library app.", href: "/books", kind: "Page", keywords: "ebooks audiobooks app download online", popular: true },
  { title: "Our programs", text: "Weekly programmes at the centre.", href: "/programs", kind: "Page", keywords: "after class tutorials" },
  { title: "Join a club", text: "How joining a club works.", href: "/join", kind: "Page", keywords: "register sign up" },
  { title: "Gallery", text: "Photographs from the centre.", href: "/gallery", kind: "Page", keywords: "photos pictures" },
  { title: "News and stories", text: "News from the centre.", href: "/news", kind: "Page", keywords: "latest updates press" },
  { title: "Our team", text: "Leadership and community.", href: "/team", kind: "Page", keywords: "staff director chief board people" },
  { title: "Impact", text: "Figures, timeline and partners.", href: "/impact", kind: "Page", keywords: "report numbers statistics funders annual" },
  { title: "Policies", text: "Privacy, accessibility, borrowing and conduct.", href: "/policies", kind: "Page", keywords: "rules terms conditions donations" },
  { title: "Plan a visit", text: "Address, plus code, directions and what to know.", href: "/visit", kind: "Page", keywords: "location map directions address opening hours where", popular: true },
  { title: "Contact us", text: "Send the team a message.", href: "/contact", kind: "Page", keywords: "email phone message" },
  { title: "Hire the hall", text: "Conference hall for meetings and events.", href: "/hire", kind: "Page", keywords: "conference venue booking" },
  { title: "Volunteer", text: "Ways to help at the centre.", href: "/volunteer", kind: "Page", keywords: "mentor help" },
  { title: "Support the centre", text: "Donate and give.", href: "/donate", kind: "Page", keywords: "donations give money books equipment" },
  { title: "Sponsors", text: "Who funds the centre.", href: "/sponsors", kind: "Page" },
  { title: "Partners", text: "Organisations we work with.", href: "/partners", kind: "Page", keywords: "mtn telecel ghana library authority" },
  { title: "FAQ", text: "Answers to common questions.", href: "/faq", kind: "Page", keywords: "questions help" },
  { title: "Privacy", text: "How we use your details.", href: "/privacy", kind: "Page" },
  { title: "Accessibility", text: "Accessibility on this website.", href: "/accessibility", kind: "Page" },
];

const clubEntries: SearchEntry[] = clubs.map((c) => ({
  title: c.title,
  text: `${c.meets}, ${c.time}. ${c.blurb}`,
  href: `/clubs/${c.id}`,
  kind: "Club",
  keywords: `${c.label} ${c.venue} ${c.ageGroup}`,
}));

const newsEntries: SearchEntry[] = newsPosts.map((p) => ({
  title: p.title,
  text: p.dek,
  href: `/news/${p.id}`,
  kind: "News",
  keywords: p.category,
}));

export const siteIndex: SearchEntry[] = [...pages, ...clubEntries, ...newsEntries];
