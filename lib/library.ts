/**
 * Everyday library facts that are NOT confirmed yet live here, in one place.
 * Fill a value in and every page that shows it updates; leave it empty and the
 * site shows a clear "to be confirmed" state instead of guessing.
 */
export const libraryInfo = {
  /** e.g. [{ day: "Monday to Friday", time: "9:00 AM – 5:00 PM" }, { day: "Saturday", time: "10:00 AM – 2:00 PM" }] */
  hours: null as { day: string; time: string }[] | null,
  /** e.g. "+233 24 000 0000" */
  phone: null as string | null,
  /** e.g. "library@your-domain.org" */
  email: null as string | null,
  /** e.g. "https://wa.me/233240000000" */
  whatsapp: null as string | null,
};

export type LibEvent = {
  id: string;
  title: string;
  /** ISO date, e.g. "2026-12-05" */
  date: string;
  time?: string;
  venue: string;
  text: string;
  href?: string;
};

/** Dated events. Add one here and it appears on /events (newest first is not required). */
export const events: LibEvent[] = [];

export const team = [
  {
    name: "Mr Stephen Adusei",
    role: "Library Director",
    text: "Leads the day-to-day running of the library and its programmes.",
  },
  {
    name: "Dr. Daniel Kwame Apau",
    role: "Chair of founders",
    text: "Chairs Wiamoase Citizens in the Diaspora, the group whose contributions built the centre.",
  },
  {
    name: "Nana Boakye Yiadom",
    role: "Chief of Wiamoase",
    text: "The paramount chief of Wiamoase, who has urged students and residents to make good use of the centre.",
  },
] as const;

export type Policy = {
  title: string;
  text: string;
  status: "published" | "tbc";
  href?: string;
  cta?: string;
};

export const policies: Policy[] = [
  {
    title: "Privacy",
    text: "How we use the details you send us. We only use them to reply.",
    status: "published",
    href: "/privacy",
    cta: "Read the privacy page",
  },
  {
    title: "Accessibility",
    text: "What we do to keep the website usable for everyone, and how to tell us about a problem.",
    status: "published",
    href: "/accessibility",
    cta: "Read the accessibility page",
  },
  {
    title: "Hall hire",
    text: "The conference hall can be hired for meetings, workshops and events. Hire helps maintain the centre.",
    status: "published",
    href: "/hire",
    cta: "See hall hire",
  },
  {
    title: "Borrowing and loans",
    text: "Who can borrow, how many books at a time, loan periods and late returns are being finalised.",
    status: "tbc",
  },
  {
    title: "Conduct in the library",
    text: "A short, friendly code for readers, club members and visitors is being finalised.",
    status: "tbc",
  },
  {
    title: "Donating books and equipment",
    text: "Guidelines on what the shelves and labs need most are being finalised. Please message us before you bring anything.",
    status: "tbc",
    href: "/donate",
    cta: "Ways to support the centre",
  },
];

/** Figures already published elsewhere on the site, gathered for the impact page. */
export const impactFigures = [
  { value: "~$500K", label: "Reported raised by Wiamoase citizens abroad" },
  { value: "2", label: "Storeys in the Learning Development Centre" },
  { value: "3", label: "Free weekly clubs: coding, robotics and reading" },
  { value: "GHS 746,425", label: "Reported value of the MTN Integrated STEM Lab equipment" },
  { value: "1,000", label: "Learners targeted across Ashanti by the Ashanti Codes programme" },
  { value: "5,000+", label: "Free titles reported in the Ghana Library app in 2020" },
] as const;
