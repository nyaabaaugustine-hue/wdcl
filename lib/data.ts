import { pick, GENERIC_ALT, libraryPhotos } from "@/lib/media";

/**
 * Card photos from /media.assets, chosen by position in `libraryPhotos` (lib/media.ts)
 * so each card gets its own photo. If one shows the wrong thing, change its number
 * here (0 to 33) and write a real `imageAlt` for it.
 */
const CARD_PHOTO = {
  robotics: libraryPhotos[5],
  conference: libraryPhotos[13],
  afterClass: libraryPhotos[20],
  coding: libraryPhotos[9],
} as const;

export const FACEBOOK_URL =
  "https://www.facebook.com/people/Wiamoase-Diaspora-Public-Library/100086561113171/";
export const MAP_URL = "https://www.google.com/maps?q=7.067,-1.533";
export const ADDRESS =
  "Agona Wiamoase, Sekyere South District, Ashanti Region, Ghana";
export const PLUS_CODE = "3F3J+2M2, Wiamoase";

export type NavLink = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  {
    label: "About",
    children: [
      { label: "About us", href: "/about" },
      { label: "Our story", href: "/#story" },
      { label: "Facilities", href: "/#facilities" },
      { label: "FAQ", href: "/faq" },
      { label: "Our team", href: "/team" },
      { label: "Impact", href: "/impact" },
    ],
  },
  {
    label: "Explore",
    children: [
      { label: "Our Programs", href: "/programs" },
      { label: "Clubs", href: "/clubs" },
      { label: "Join a club", href: "/join" },
      { label: "Gallery", href: "/gallery" },
      { label: "Digital library", href: "/books" },
    ],
  },
  {
    label: "Library",
    children: [
      { label: "Services", href: "/services" },
      { label: "Become a member", href: "/membership" },
      { label: "Find a book", href: "/collection" },
      { label: "Ask a librarian", href: "/ask" },
      { label: "Events & timetable", href: "/events" },
      { label: "Children & teens", href: "/kids" },
      { label: "Policies", href: "/policies" },
    ],
  },
  {
    label: "Get involved",
    children: [
      { label: "Sponsors", href: "/sponsors" },
      { label: "Partners", href: "/partners" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Support the centre", href: "/donate" },
      { label: "Hire the hall", href: "/hire" },
    ],
  },
  { href: "/news", label: "News" },
  {
    label: "Visit & contact",
    children: [
      { label: "Plan a visit", href: "/visit" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

/** Hero photograph of the centre — shared by the Visit page and the Contact backdrop. */
export const visitPhoto =
  "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791290476/540452100_761460213416009_8447312575741898348_n_yo9ddu.jpg";

/**
 * Centralised photography source so every image can be swapped in one place.
 * Now served from /media.assets (see lib/media.ts); the id is only a stable key,
 * so existing `photo("photo-…", w)` calls keep working and get a real photo.
 */
export const photo = (id: string, _width?: number) => pick(id);

export const heroPhotos = [
  {
    src: "/media/slider-1.jpg",
    full: "/media/slider-1.jpg",
    alt: "A photograph from Wiamoase library",
    caption: "Inside the centre",
  },
  {
    src: "/media/slider-2.jpg",
    full: "/media/slider-2.jpg",
    alt: "A photograph from Wiamoase library",
    caption: "Learning together",
  },
  {
    src: "/media/slider-3.jpg",
    full: "/media/slider-3.jpg",
    alt: "A photograph from Wiamoase library",
    caption: "The Wiamoase centre",
  },
] as const;

export const storyPhoto = {
  src: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791461530/thumbnail_IMG-20220419-WA0034_wcn0q8.jpg",
  alt: "The Learning Development Centre in Wiamoase, Ghana",
  caption: "The Learning Development Centre",
} as const;

/** Decorative wash behind the homepage hero. Placeholder pending approved photography. */
export const heroBackdrop = {
  src: pick("hero-backdrop"),
  full: pick("hero-backdrop"),
  alt: GENERIC_ALT,
} as const;

/** Decorative crossfading background behind the hero copy. Swap for
 *  /media/hero-bg-*.jpg once the assets folder is renamed by slot. */
export const heroBackdropSlides: string[] = [heroBackdrop.full];

export const stats = [
  { value: "~$500K", label: "Reported raised by diaspora citizens", href: "#story" },
  { value: "3", label: "Free clubs: coding, robotics, reading", href: "#clubs" },
  { value: "12", label: "Weekly programmes", href: "/programs" },
  { value: "1st", label: "Integrated STEM lab of its kind in Ashanti", href: "#facilities" },
];

export const glance = [
  ["Type", "Public library"],
  ["Affiliation", "Ghana Library Authority"],
  ["Location", "Agona Wiamoase, Sekyere South"],
  ["Region", "Ashanti, Ghana"],
  ["Founded by", "Wiamoase Citizens in the Diaspora"],
  ["Chair of founders", "Dr. Daniel Kwame Apau"],
  ["Paramount chief", "Nana Boakye Yiadom"],
  ["Facilities", "Library, ICT & robotics, conference hall"],
] as const;

export const facilities = [
  {
    icon: "book",
    title: "Community Library",
    text: "A stocked public library with offices, serving students, teachers and residents of Wiamoase and nearby towns.",
    image: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791466702/vv_z2zakh.jpg",
    imageAlt: "Shelves of books in the community library",
    href: "/#overview",
  },
  {
    icon: "robot",
    title: "Robotics & ICT Centre",
    text: "Robotics kits, laptops, desktop computers and AI tools for STEM education, commissioned 26 November 2024.",
    image: CARD_PHOTO.robotics,
    imageAlt: GENERIC_ALT,
    note: "Equipped by the MTN Ghana Foundation",
    href: "/clubs/robotics",
  },
  {
    icon: "users",
    title: "Conference Centre",
    text: "A furnished hall for meetings, workshops and community events. It is also a source of income to maintain the centre.",
    image: CARD_PHOTO.conference,
    imageAlt: GENERIC_ALT,
    href: "/hire",
  },
  {
    icon: "grad",
    title: "After-Class Studies & Tutorials",
    text: "Supervised after-school sessions for homework, revision and small-group tuition, making full use of the library's books and computers.",
    image: CARD_PHOTO.afterClass,
    imageAlt: GENERIC_ALT,
    href: "/programs",
  },
] as const;

export type Club = {
  id: "coding" | "robotics" | "reading";
  label: string;
  icon: "code" | "robot" | "book";
  badge: string;
  title: string;
  blurb: string;
  longDesc: string;
  meets: string;
  time: string;
  venue: string;
  shortDays: string;
  ageGroup: string;
  /** Mon..Sun, true when the club meets */
  days: boolean[];
  programmes: { title: string; desc: string }[];
  highlights: string[];
  whoFor: string[];
  image: string;
  imageAlt: string;
  /**
   * Extra photos for the moving slideshow on the club page (the main `image` is always
   * shown first). These are placeholders chosen from the centre's photo library: swap the
   * numbers (0 to 33 in lib/media.ts) for photos that really show this club.
   */
  gallery: string[];
  /** Named supporter, where one is publicly documented. */
  supporter?: string;
  /** Custom icon image replacing the default SVG for this club. */
  iconImg?: string;
};

export const clubs: Club[] = [
  {
    id: "coding",
    label: "Coding",
    icon: "code",
    badge: "Ages 10–18 · Beginners welcome",
    title: "Coding Club",
    blurb: "Build websites, games and small apps on the centre's computers. No experience needed.",
    meets: "Tuesdays & Thursdays",
    time: "4:00 – 5:30 PM",
    venue: "ICT Lab",
    shortDays: "Tue, Thu",
    ageGroup: "10–18",
    days: [false, true, false, true, false, false, false],
    longDesc:
      "The Coding Club runs in the ICT Lab inside the Robotics & ICT Centre, using the laptops and desktop computers supplied by the MTN Ghana Foundation. Members start with visual block coding in Scratch and move on to text-based programming, working on projects they choose themselves — animations, simple games, small web pages and tools that solve a problem they actually have. Nobody is expected to have programmed before.",
    highlights: [
      "Laptops and desktop computers supplied by the MTN Ghana Foundation",
      "Visual block coding first, then text-based languages",
      "Member-led projects rather than a fixed syllabus",
      "Showcase sessions where members demo what they built",
    ],
    whoFor: [
      "Ages 10–18, complete beginners included",
      "Anyone curious about how websites and games are made",
      "Members who want to work at their own pace",
    ],
    image: CARD_PHOTO.coding,
    gallery: [libraryPhotos[10], libraryPhotos[11], libraryPhotos[12], libraryPhotos[16]],
    imageAlt: GENERIC_ALT,
    programmes: [
      { title: "Computer Literacy Basics", desc: "Typing, files, internet safety and office tools. Tuesdays." },
      { title: "Scratch Starters", desc: "Visual coding: animations and simple games." },
      { title: "Web Builders", desc: "HTML, CSS and a first personal web page. Thursdays." },
      { title: "Python Playground", desc: "Variables, loops and mini projects for older members." },
    ],
  },
  {
    id: "robotics",
    label: "Robotics",
    icon: "robot",
    badge: "Ages 12–18 · Teams of 4",
    title: "Robotics Club",
    blurb:
      "Design, build and program robots with sensors and motors, and solve real community challenges as a team.",
    meets: "Wednesdays & Fridays",
    time: "4:00 – 6:00 PM",
    venue: "Robotics Lab",
    shortDays: "Wed, Fri",
    ageGroup: "12–18",
    days: [false, false, true, false, true, false, false],
    longDesc:
      "The Robotics Club works in the dedicated Robotics Lab of the Integrated STEM Lab commissioned by the MTN Ghana Foundation in November 2024 — the first centre of its kind in the Ashanti Region. Members assemble and program robots, wire up sensors, and work in teams on a build-and-solve challenge. The equipment list is unusually well resourced for a rural community centre: LEGO Education SPIKE Prime units, REV Robot kits, drone technology and virtual reality sets, alongside Scratch, Java and Python programming.",
    highlights: [
      "LEGO Education SPIKE Prime and REV Robot construction kits",
      "Drone technology and virtual reality sets on site",
      "Sensors, motors and microcontroller fundamentals",
      "Team challenge judged at a term-end showcase",
    ],
    whoFor: [
      "Ages 12–18 who enjoy building physical things",
      "Members interested in engineering and electronics",
      "Teams of four — no experience needed to join a team",
    ],
    image: CARD_PHOTO.robotics,
    imageAlt: GENERIC_ALT,
    gallery: [libraryPhotos[6], libraryPhotos[7], libraryPhotos[8], libraryPhotos[15]],
    supporter: "Equipment funded by the MTN Ghana Foundation",
    iconImg: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791283746/jhh_labq8g.png",
    programmes: [
      { title: "Robot Basics", desc: "Circuits, motors and sensors with starter kits. Wednesdays." },
      { title: "Arduino Lab", desc: "Line-following and obstacle-avoiding bots. Fridays." },
      { title: "AI Explorers", desc: "Hands-on intro to AI tools and what they can do." },
      {
        title: "Build-a-Solution Challenge",
        desc: "Teams prototype a robot that helps their community, then show it off at term end.",
      },
    ],
  },
  {
    id: "reading",
    label: "Reading",
    icon: "book",
    badge: "All ages · Free to join",
    title: "Reading Club",
    blurb:
      "Share stories, discover Ghanaian and African authors and build a reading habit, with groups for children, teens and adults.",
    meets: "Saturdays",
    time: "10:00 – 11:30 AM",
    venue: "Library Reading Area",
    shortDays: "Sat",
    ageGroup: "All ages",
    days: [false, false, false, false, false, true, false],
    longDesc:
      "The Reading Club is the longest-standing of the three and the only one open to every generation in Wiamoase. Saturday sessions combine shared reading aloud with discussion and creative response, and the club is deliberately organised in groups so that a nine-year-old and a grandparent can both find something at their level. African and Ghanaian authors feature heavily, including stories in Twi.",
    highlights: [
      "Open to children, teenagers and adults",
      "Read-aloud sessions including Twi stories",
      "Monthly discussion of one African-authored book",
      "Termly reading challenge with certificates",
    ],
    whoFor: [
      "All ages and every reading level",
      "Families who want to read together",
      "Adults looking for a monthly discussion group",
    ],
    image: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791466702/vv_z2zakh.jpg",
    imageAlt: "Tall shelves of books in the library reading room",
    gallery: [libraryPhotos[14], libraryPhotos[17], libraryPhotos[18], libraryPhotos[19]],
    programmes: [
      { title: "Story Circle", desc: "Read-aloud sessions, including Twi stories, for ages 4–9." },
      { title: "Teen Book Talk", desc: "Monthly discussion of one African-authored book." },
      { title: "Adult Book Club", desc: "Fiction and non-fiction on the last Saturday of the month." },
      { title: "Reading Challenge", desc: 'A termly "read 10 books" challenge with certificates.' },
    ],
  },
];

export const clubById = (id: string) => clubs.find((c) => c.id === id);

/**
 * Equipment delivered to the Integrated STEM Lab by the MTN Ghana Foundation.
 * Figures reported at the November 2024 commissioning.
 */
export const stemLab = {
  funder: "MTN Ghana Foundation",
  commissioned: "26 November 2024",
  reportedValue: "GHS 746,425",
  distinction: "The first integrated STEM lab of its kind in the Ashanti Region",
  equipment: [
    { name: "LEGO Education SPIKE Prime", detail: "Hands-on STEM investigation units for pre-school to secondary students" },
    { name: "REV Robot kits", detail: "Over 1,400 parts per kit for flexible robot design" },
    { name: "Drone technology", detail: "Flight kits for aerial robotics projects" },
    { name: "Virtual reality sets", detail: "Immersive VR for the centre's learning space" },
    { name: "Laptops & desktop computers", detail: "The ICT Lab's main computing capacity" },
    { name: "Scratch, Java & Python", detail: "Programming curriculum from visual to text-based coding" },
    { name: "AI tools", detail: "Introduced as part of the centre's digital skills offer" },
  ],
  quote: {
    text: "This Integrated STEM Lab is more than just a building; it is a gateway to opportunities.",
    attribution: "Robert Kuzoe, Senior Manager, MTN Ghana Foundation",
  },
} as const;

/**
 * Telecel Ghana Foundation programme delivered at Wiamoase in partnership with
 * the Ghana Library Authority. Weekend training, separate from the weekly clubs.
 */
export const ashantiCodes = {
  name: "Ashanti Codes",
  funder: "Telecel Ghana Foundation",
  pillar: "Connected Learning",
  partners: "Ghana Library Authority, Asustem Robotics",
  supporter: "AngloGold Ashanti",
  audience: "Upper primary and junior high school students",
  subjects: ["Coding", "Robotics", "Design thinking", "Internet of Things"] as const,
  format: "Structured weekend training sessions",
  locations: "Kumasi, Nsuta, Wiamoase and Obuasi",
  target: "1,000 learners across the Ashanti Region",
  projects: [
    "Obstacle-sensor robot cars",
    "Line-following robots",
    "A robotic assistant for the visually impaired",
    "Text-to-speech software",
    "Alarm applications and calculator apps",
  ],
} as const;

export const timeline = [
  {
    when: "Roots",
    title: "An Ashanti town with deep history",
    text: "Wiamoase, in the Sekyere South District, is known for its link to Okomfo Anokye, and many of its citizens have since settled abroad.",
  },
  {
    when: "Diaspora union",
    title: "Wiamoase Citizens in the Diaspora",
    text: "Citizens overseas formed a union for solidarity and to fund development projects in their hometown.",
  },
  {
    when: "April 2022",
    title: "Learning Development Centre inaugurated",
    text: "A two-storey complex with a conference centre and community library, funded by members' contributions of about $500,000, was inaugurated.",
  },
  {
    when: "26 November 2024",
    title: "Robotics & ICT Centre commissioned",
    text: "The MTN Ghana Foundation equipped the centre, the first of its kind in the Ashanti Region under its STEM initiative, joining projects in Mamfe, Akim Oda and Dansoman.",
  },
];

export const topics = [
  "General enquiry",
  "Coding Club",
  "Robotics Club",
  "Reading Club",
  "Donations & partnerships",
  "Hall hire",
  "Volunteering",
  "Library membership",
  "Ask a librarian",
  "Book request",
];

/* ---------- Sponsors ---------- */

export type Sponsor = {
  name: string;
  role: string;
  note?: string;
  logo?: string;
  /** false = placeholder awaiting confirmation from the library team */
  confirmed: boolean;
};

export type SponsorTier = {
  id: string;
  label: string;
  blurb: string;
  sponsors: Sponsor[];
};

/**
 * Only entries marked `confirmed: true` are drawn from published sources.
 * Unconfirmed slots render visibly as awaiting confirmation so the page
 * never implies an endorsement that has not been given.
 */
export const sponsorTiers: SponsorTier[] = [
  {
    id: "capital",
    label: "Capital & founding",
    blurb: "The gifts that built and equipped the Learning Development Centre.",
    sponsors: [
      {
        name: "Wiamoase Citizens in the Diaspora",
        role: "Founding collective",
        note: "About US$500,000 raised through members' voluntary contributions.",
        logo: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791294178/wddddd_kmajrd.png",
        confirmed: true,
      },
    ],
  },
  {
    id: "programme",
    label: "Programme partners",
    blurb: "Organisations funding a specific centre, programme or piece of equipment.",
    sponsors: [
      {
        name: "MTN Ghana Foundation",
        role: "Robotics & ICT Centre",
        note: "Equipped the ICT centre as part of its STEM initiative, commissioned 26 November 2024.",
        logo: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791279018/Scholarship-MTN-foundation_qkjuli.jpg",
        confirmed: true,
      },
      {
        name: "Ghana Library Authority",
        role: "Host branch",
        note: "The library operates as a branch of the Ghana Library Authority.",
        logo: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791294071/libry_authority_kb8up5.jpg",
        confirmed: true,
      },
    ],
  },
  {
    id: "inkind",
    label: "In-kind & gifts",
    blurb: "Books, equipment and services given in place of a cash gift.",
    sponsors: [
      { name: "Awaiting confirmation", role: "Book donations", confirmed: false },
      { name: "Awaiting confirmation", role: "Equipment & furniture", confirmed: false },
      { name: "Awaiting confirmation", role: "Professional services", confirmed: false },
    ],
  },
];

export const memberStats = [
  { value: "~$500K", label: "Raised by diaspora members" },
  { value: "2", label: "Storey complex built" },
  { value: "2022", label: "Centre inaugurated" },
  { value: "Nov 2024", label: "Robotics centre commissioned" },
] as const;

/* ---------- Partners ---------- */

export type Partner = {
  name: string;
  kind: string;
  role: string;
  logo: string;
};

export const partners: Partner[] = [
  {
    name: "MTN Ghana Foundation",
    kind: "Foundation",
    role: "Funded and equipped the Robotics & ICT Centre under its STEM initiative in the Ashanti Region.",
    logo: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791279018/Scholarship-MTN-foundation_qkjuli.jpg",
  },
  {
    name: "Ghana Library Authority",
    kind: "Government",
    role: "Host branch providing affiliation, library standards and oversight.",
    logo: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791294071/libry_authority_kb8up5.jpg",
  },
  {
    name: "Wiamoase Citizens in the Diaspora",
    kind: "Community",
    role: "Founding body, fundraising and ongoing programme support from abroad.",
    logo: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791294178/wddddd_kmajrd.png",
  },
];

export const partnerWays = [
  "Fund a specific club or workshop series",
  "Equip the ICT lab or robotics bench",
  "Donate books and learning materials",
  "Sponsor a scholarship for a student",
] as const;

/* ---------- Gallery ---------- */

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  tag: string;
  full: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/media/gallery-1.jpg",
    full: "/media/gallery-1.jpg",
    alt: "A photograph from the Wiamoase library",
    caption: "Photograph from the Wiamoase centre",
    tag: "Centre",
  },
  {
    src: "/media/gallery-2.jpg",
    full: "/media/gallery-2.jpg",
    alt: "A photograph from the Wiamoase library",
    caption: "Around the centre",
    tag: "Centre",
  },
  {
    src: "/media/gallery-3.jpg",
    full: "/media/gallery-3.jpg",
    alt: "A photograph from the Wiamoase library",
    caption: "Inside the centre",
    tag: "Centre",
  },
  {
    src: "/media/gallery-4.jpg",
    full: "/media/gallery-4.jpg",
    alt: "A photograph from the Wiamoase library",
    caption: "Learning in Wiamoase",
    tag: "Centre",
  },
  {
    src: "/media/gallery-5.jpg",
    full: "/media/gallery-5.jpg",
    alt: "A photograph from the Wiamoase library",
    caption: "Community life",
    tag: "Centre",
  },
  {
    src: "/media/gallery-6.jpg",
    full: "/media/gallery-6.jpg",
    alt: "A photograph from the Wiamoase library",
    caption: "Programmes at the centre",
    tag: "Centre",
  },
];

/* ---------- Volunteer ---------- */

export type VolunteerRole = {
  icon: "code" | "robot" | "book" | "users" | "heart" | "check";
  title: string;
  commitment: string;
  text: string;
  remote: boolean;
};

export const volunteerRoles: VolunteerRole[] = [
  {
    icon: "code",
    title: "Coding Club mentor",
    commitment: "2 hours per week, Tuesdays or Thursdays",
    text: "Support beginners as they move from computer literacy to building their first web page. No teaching experience needed — patience is enough.",
    remote: true,
  },
  {
    icon: "robot",
    title: "Robotics Club mentor",
    commitment: "2 hours per week, Wednesdays or Fridays",
    text: "Guide teams through circuits, sensors and Arduino. Help them solve the community challenges they set out to build.",
    remote: true,
  },
  {
    icon: "book",
    title: "Reading Club host",
    commitment: "One Saturday a month, 10:00–11:30",
    text: "Lead a story circle or book talk, and help readers find African-authored titles they will actually finish.",
    remote: true,
  },
  {
    icon: "users",
    title: "Community workshop host",
    commitment: "Ad hoc, a few times a year",
    text: "Run a session in the conference centre for students, teachers or local organisations.",
    remote: false,
  },
  {
    icon: "heart",
    title: "Outreach coordinator",
    commitment: "Remote, flexible hours",
    text: "Help diaspora members stay connected to the centre, and coordinate book drives and equipment donations.",
    remote: true,
  },
  {
    icon: "check",
    title: "Facilities volunteer",
    commitment: "Weekends, on site",
    text: "Support events, tidy the reading area and help visitors find what they need.",
    remote: false,
  },
];
