/**
 * Membership content for /membership.
 *
 * DEMO DATA: the in-person rules below are EXAMPLES so the page can be previewed. They are
 * labelled "Demo content" on the site. Replace each one with the library's real rule (or set a
 * value back to `null` to show "To be confirmed"), then set `DEMO_MEMBERSHIP` to false.
 *
 * What IS confirmed (from the Ghana Library Authority's app listing and this site's club data):
 * the Ghana Library app is free, needs no library card, and all three clubs are free to join.
 */
export const DEMO_MEMBERSHIP = true;

export type MembershipDetail = {
  id: string;
  question: string;
  hint: string;
  /** Plain-language answer. `null` shows "To be confirmed". */
  value: string | null;
};

export const membershipDetails: MembershipDetail[] = [
  {
    id: "who",
    question: "Who can join",
    hint: "Ages, where you live, and whether a parent or guardian needs to sign.",
    value: "Anyone aged 6 and over who lives in or near Wiamoase. Under-18s register with a parent or guardian.",
  },
  {
    id: "bring",
    question: "What to bring",
    hint: "Any ID, photographs or forms needed to register.",
    value: "One form of ID (for children, a school ID or a parent's ID) and one passport-size photograph.",
  },
  {
    id: "cost",
    question: "What it costs",
    hint: "Any registration fee for borrowing members.",
    value: "Registration is free.",
  },
  {
    id: "borrow",
    question: "Books and loan period",
    hint: "How many books you may borrow and for how long.",
    value: "Up to 2 books at a time for 14 days, renewable once.",
  },
  {
    id: "fines",
    question: "Late and lost books",
    hint: "What happens if a book comes back late, damaged or not at all.",
    value: "A small fee for each late day. A lost or damaged book is replaced or paid for.",
  },
];

export type MembershipPolicy = {
  id: string;
  title: string;
  /** Plain-language policy. `null` shows "Being finalised". */
  summary: string | null;
};

export const membershipPolicies: MembershipPolicy[] = [
  {
    id: "borrowing",
    title: "Borrowing rules",
    summary:
      "Members show their card when borrowing. Reference books and the newest arrivals stay in the library for reading.",
  },
  {
    id: "conduct",
    title: "Using the library and the labs",
    summary:
      "Be kind, keep voices low in the reading area, look after the books and computers, and ask a team member if you need help.",
  },
  {
    id: "donations",
    title: "Donating books",
    summary:
      "Please contact the team before you bring books so they can say what the library can use. Books in good condition, for children and for school subjects, are most welcome.",
  },
];

export const membershipBenefits = [
  {
    icon: "book",
    title: "The free digital library",
    text: "E-books, audiobooks and educational videos in the Ghana Library app, free and with no library card.",
  },
  {
    icon: "users",
    title: "Clubs at no cost",
    text: "The Coding, Robotics and Reading clubs are all free to join.",
  },
  {
    icon: "pin",
    title: "Find a branch",
    text: "The Ghana Library app shows the Authority's library branches on a map, with directions.",
  },
] as const;
