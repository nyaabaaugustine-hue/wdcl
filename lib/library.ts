/**
 * Everyday library facts live here, in one place.
 *
 * DEMO DATA: while `DEMO` is true, the opening hours, phone, email, events, extra team
 * roles and the "demo" policies below are EXAMPLES so the pages can be previewed. They
 * are labelled "Demo" on the site. Replace them with the library's confirmed details,
 * then set `DEMO` to false.
 */
export const DEMO = true;

export const libraryInfo = {
  /** DEMO hours. Replace with the real opening hours. */
  hours: [
    { day: "Monday to Friday", time: "9:00 AM – 5:00 PM" },
    { day: "Saturday", time: "10:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed" },
  ] as { day: string; time: string }[] | null,
  /** DEMO number (not a working number). e.g. "+233 24 000 0000" once real. */
  phone: "+233 00 000 0000" as string | null,
  /** DEMO address (example.org is a reserved domain). e.g. "library@your-domain.org" once real. */
  email: "hello@example.org" as string | null,
  /** e.g. "https://wa.me/233240000000" once real. Left empty so no demo link opens WhatsApp. */
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
  /** true while the event is an example */
  demo?: boolean;
};

/** Dated events. Add one here and it appears on /events. These three are DEMO examples. */
export const events: LibEvent[] = [
  {
    id: "family-saturday",
    title: "Family Reading Saturday",
    date: "2026-11-07",
    time: "10:00 AM – 12:00 PM",
    venue: "Library Reading Area",
    text: "Read together with children, teens and grandparents, with stories in English and Twi.",
    href: "/clubs/reading",
    demo: true,
  },
  {
    id: "open-day",
    title: "Open day: meet the clubs",
    date: "2026-11-21",
    time: "9:00 AM – 1:00 PM",
    venue: "Whole centre",
    text: "Try coding, robotics and reading sessions, tour the labs and meet the library team.",
    href: "/clubs",
    demo: true,
  },
  {
    id: "holiday-coding",
    title: "Holiday coding camp",
    date: "2026-12-12",
    time: "9:30 AM – 1:30 PM",
    venue: "ICT Lab",
    text: "A one-day beginners' camp: build a first web page and a small game.",
    href: "/clubs/coding",
    demo: true,
  },
];

export type TeamMember = {
  name: string;
  role: string;
  text: string;
  /** true for placeholder roles still waiting for a real name */
  demo?: boolean;
};

export const team: TeamMember[] = [
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
  {
    name: "Name to be added",
    role: "Children's librarian",
    text: "Looks after story circles and reading help for young readers.",
    demo: true,
  },
  {
    name: "Name to be added",
    role: "ICT and robotics coordinator",
    text: "Runs the labs and supports the Coding and Robotics clubs.",
    demo: true,
  },
  {
    name: "Name to be added",
    role: "Volunteer coordinator",
    text: "Welcomes volunteers and matches them to clubs and events.",
    demo: true,
  },
];

export type Policy = {
  title: string;
  text: string;
  /** published = a real page exists; demo = example wording; tbc = not written yet */
  status: "published" | "demo" | "tbc";
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
    text: "Members may borrow up to 2 books for 14 days. Books can be renewed once if no one is waiting. A small fee applies for each late day.",
    status: "demo",
  },
  {
    title: "Conduct in the library",
    text: "Be kind, keep voices low in the reading area, look after the books and computers, and ask a team member if you need help.",
    status: "demo",
  },
  {
    title: "Donating books and equipment",
    text: "Please message us before you bring anything, so we can say what the shelves and labs need most.",
    status: "demo",
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
