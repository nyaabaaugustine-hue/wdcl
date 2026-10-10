import { pick, GENERIC_ALT } from "@/lib/media";

/**
 * News and stories for the library site.
 *
 * Every entry is a real, dated, publicly reported story about the centre, with
 * the original publisher credited and linked. Nothing here is invented copy:
 * figures, names and quotations are taken from the sources named in `source`.
 *
 * When a new story is published, add it to the top of the array. `id` doubles as
 * the route slug and must stay stable once published.
 */

export type NewsCategory = "STEM" | "Milestones" | "Community" | "Diaspora" | "Skills";

export type NewsPost = {
  id: string;
  title: string;
  /** Short standfirst shown on cards and under the headline. */
  dek: string;
  category: NewsCategory;
  /** ISO 8601 publication date of the original report. */
  date: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  featured?: boolean;
  /** Paragraphs of the story. */
  body: string[];
  pullQuote?: { text: string; attribution: string };
  people?: { name: string; role: string }[];
  source: { name: string; url: string; published: string };
  /** Further coverage of the same story. */
  alsoReported?: { name: string; url: string }[];
};

// Real photography from /media.assets (see lib/media.ts); the id is only a stable key.
const img = (id: string, _width?: number) => pick(id);

export const newsPosts: NewsPost[] = [
  {
    id: "telecel-ashanti-codes-exhibition",
    title: "Ashanti Codes students exhibit robot cars and screen readers in Wiamoase",
    dek: "The first cohort of Telecel Ghana Foundation's regional training programme showed off projects built to solve problems they found in their own communities.",
    category: "STEM",
    date: "2026-06-24",
    readMinutes: 3,
    image: img("photo-1531482615713-2afd69097998", 1200),
    imageAlt: GENERIC_ALT,
    featured: true,
    body: [
      "Students who took part in the first cohort of the Telecel Ghana Foundation's Ashanti Codes programme exhibited their finished projects in Wiamoase and Obuasi, bringing together facilitators and members of the media to see what weeks of hands-on training had produced.",
      "The programme is designed to introduce upper primary and junior high school students to coding, robotics, design thinking and Internet of Things technologies through structured weekend sessions. Its stated mission is to equip 1,000 learners across the Ashanti Region with digital skills.",
      "The projects on display were chosen by the students to address problems they had noticed around them. Among them were obstacle-sensor robot cars, line-following robots, and a robotic assistant built with the needs of visually impaired users in mind. The software side of the cohort's work included text-to-speech software, alarm applications and calculator apps.",
      "Ashanti Codes forms part of the Telecel Ghana Foundation's Connected Learning pillar, which the foundation describes as an attempt to bridge the digital divide and inspire a new generation of innovators, creators and digital leaders.",
    ],
    pullQuote: {
      text: "Ashanti Codes is helping students to move beyond just consuming technology to creating solutions that can improve lives, strengthen communities and prepare them for the digital economy.",
      attribution: "Rita Agyeiwaa Rockson, Foundation, Sustainability and External Communications Manager, Telecel Ghana",
    },
    people: [
      { name: "Kwaku Asiedu", role: "Executive Head for Ashanti, Bono East and Ahafo, Telecel Ghana" },
      { name: "Rita Agyeiwaa Rockson", role: "Foundation, Sustainability and External Communications Manager, Telecel Ghana" },
      { name: "Mavis Nana Yaa Kyei", role: "Social Development and Gender Superintendent, AngloGold Ashanti" },
    ],
    source: {
      name: "Ameyaw Debrah",
      url: "https://ameyawdebrah.com/telecel-ashanti-codes-train-stops-at-wiamoase-and-obuasi/",
      published: "24 June 2026",
    },
    alsoReported: [
      { name: "BusinessGhana", url: "https://www.businessghana.com/site/news/business/350948/Telecel-Ashanti-Codes-train-stops-at-Wiamoase-and-Obuasi" },
      { name: "GhanaWeb", url: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/Telecel-Ashanti-Codes-train-stops-at-Wiamoase-and-Obuasi-2040655" },
      { name: "Happy Ghana", url: "https://www.happyghana.com/telecel-ashanti-codes-train-stops-at-wiamoase-and-obuasi/" },
    ],
  },
  {
    id: "mtn-integrated-stem-lab-handover",
    title: "MTN Ghana Foundation hands over the Integrated STEM Lab",
    dek: "GHS 746,425 of equipment — LEGO Education, REV Robot kits, drones and virtual reality — arrives for the first integrated STEM lab of its kind in the Ashanti Region.",
    category: "Milestones",
    date: "2025-01-25",
    readMinutes: 3,
    image: img("photo-1581092160562-40aa08e78837", 1200),
    imageAlt: GENERIC_ALT,
    body: [
      "The MTN Ghana Foundation has formally handed over a modern integrated STEM laboratory at Wiamoase, describing it as the first of its kind in the Ashanti Region. The facility gives students and teachers hands-on experience in robotics, programming and electronics.",
      "The Foundation supported the project with GHS 746,425 to furnish the lab. The equipment list covers the full STEM stack: LEGO Education, including SPIKE Essential units for hands-on investigation of STEM concepts; REV Robot kits with more than 1,400 parts each; drone technology; virtual reality sets; programming in Scratch, Java and Python; and science research resources.",
      "Robert Kuzoe, Senior Manager of the MTN Ghana Foundation, framed the investment as part of a wider commitment to communities that are underserved by connectivity.",
      "Nana Boakye Yiadom, Chief of Wiamoase, expressed appreciation for the foundation and urged students to make good use of the facility.",
    ],
    pullQuote: {
      text: "This Integrated STEM Lab is more than just a building; it is a gateway to opportunities. It symbolizes hope, progress and a brighter future for the children and youth of Wiamoase and beyond.",
      attribution: "Robert Kuzoe, Senior Manager, MTN Ghana Foundation",
    },
    people: [
      { name: "Robert Kuzoe", role: "Senior Manager, MTN Ghana Foundation" },
      { name: "Nana Boakye Yiadom", role: "Chief of Wiamoase" },
    ],
    source: {
      name: "Raw Gist",
      url: "https://www.rawgist.com/mtn-ghana-foundation-hands-over-state-of-the-art-integrated-stem-lab-to-wiamoase-community/",
      published: "25 January 2025",
    },
  },
  {
    id: "tcc-cimet-soap-making-training",
    title: "KNUST centre trains 40 Wiamoase residents in soap making",
    dek: "A TCC-CIMET workshop held for World Engineering Day gave community members a supplementary income skill alongside farming.",
    category: "Skills",
    date: "2025-03-25",
    readMinutes: 2,
    image: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1791470514/cc_xe6eut.jpg",
    imageAlt: GENERIC_ALT,
    body: [
      "The Technology Consultancy Center at International Centre for Innovation, Manufacturing, Technology Transfer and Entrepreneurship, based at KNUST, trained 40 members of the Wiamoase community in soap making.",
      "The session was organised as part of World Engineering Day celebrations, and covered the production of both bar and liquid soaps. It is part of TCC-CIMET's stated commitment to empowering local communities through skills development, technology transfer and sustainable economic initiatives.",
      "Kenneth Donkor, a Research Fellow at the centre, said the aim was to give participants an additional source of income alongside their primary occupation as farming. He noted that Wiamoase is recognised as a farming community, and said agricultural training was also in the programme's plans.",
      "Donkor said future sessions were expected to cover biochar production, described as an innovative method of producing eco-friendly charcoal. Participants were also briefed on handling requirements, as some of the chemicals involved in soap making need careful treatment.",
    ],
    pullQuote: {
      text: "We recognize Wiamoase as a farming community, and while you may have expected training related to agriculture, we assure you that such programmes are in our plans.",
      attribution: "Kenneth Donkor, Research Fellow, TCC-CIMET",
    },
    people: [{ name: "Kenneth Donkor", role: "Research Fellow, TCC-CIMET, KNUST" }],
    source: {
      name: "MyGhanaDaily",
      url: "https://myghanadaily.com/tcc-cimet-trains-wiamoase-community-members-in-soap-making/",
      published: "25 March 2025",
    },
  },
  {
    id: "wiamoase-diaspora-welfare-plan-canada",
    title: "Wiamoase Diaspora Welfare Plan incorporated in Canada",
    dek: "A federal not-for-profit corporation registered in Regina, Saskatchewan, with four named directors, extends the town's diaspora organising into Canadian law.",
    category: "Diaspora",
    date: "2025-04-15",
    readMinutes: 2,
    image: img("photo-1517457373958-b7bdd4587205", 1200),
    imageAlt: GENERIC_ALT,
    body: [
      "Wiamoase Diaspora Welfare Plan is registered as a federal corporation in Regina, Saskatchewan, according to the Corporations Canada register. The entity was incorporated on 15 April 2025 under the Canada Not-for-profit Corporations Act, with corporation number 16917411.",
      "Its registered office is listed at an address on Green Bluebell Road in Regina, and the record carries Business Number 766551964.",
      "The register lists four directors: Patrick Frimpong Manso, Edward Adu-Boakye, Isaac Amoakohene and Mercy Appiah-Kubi.",
      "The incorporation is notable because the centre at Wiamoase has always been diaspora-funded. Registering the organisation formally in Canada is a step that gives the fundraising and community work a legal structure to operate under.",
    ],
    source: {
      name: "Corporations Canada (OpenGov.ca record)",
      url: "https://opengovca.com/corporation/16917411",
      published: "15 April 2025",
    },
  },
  {
    id: "robotics-ict-centre-commissioned",
    title: "Robotics and ICT Centre commissioned at the library",
    dek: "MTN Ghana Foundation equips the centre as its first such facility in the Ashanti Region, with the Chief of Wiamoase urging students to maintain it well.",
    category: "STEM",
    date: "2024-11-26",
    readMinutes: 3,
    image: img("photo-1540575467063-178a50c2df87", 1200),
    imageAlt: GENERIC_ALT,
    body: [
      "The MTN Ghana Foundation commissioned the Robotics and ICT Centre at the Wiamoase Diaspora Public Library on Tuesday 26 November 2024, equipping it with robotics equipment, laptops, desktop computers and AI tools for learning and training.",
      "The library has designated the centre as a gateway for STEM education: a place where students can acquire practical technical skills, solve real-world problems creatively, and prepare for future work. The foundation also noted that the centre supports local entrepreneurs in developing digital business strategies and offers collaborative workspace for students and professionals.",
      "The Wiamoase project is the foundation's first of this kind in the Ashanti Region. Similar initiatives have been launched at the Mamfe Robotics Center, Akim Oda and the Dansoman community library.",
      "Nana Boakye Yiadom, Chief of Wiamoase, expressed gratitude and encouraged students and residents to make good use of the facility while maintaining it properly. Dr Daniel Kwame Apau, Chairman of Wiamoase Citizens in the Diaspora, set out the group's wider ambition for the centre.",
      "The independent figure reported for the project was GHC 746,425.",
    ],
    pullQuote: {
      text: "Whether you are a student seeking to enhance your STEM education, a professional looking to upgrade your skills, or an aspiring entrepreneur, this center is your launchpad.",
      attribution: "Dr Daniel Kwame Apau, Chairman, Wiamoase Citizens in the Diaspora",
    },
    people: [
      { name: "Dr Daniel Kwame Apau", role: "Chairman, Wiamoase Citizens in the Diaspora" },
      { name: "Nana Boakye Yiadom", role: "Chief of Wiamoase" },
    ],
    source: {
      name: "Modern Ghana",
      url: "https://www.modernghana.com/news/1360330/mtn-ghana-foundation-refurbishes-commissions-wiam.html",
      published: "26 November 2024",
    },
    alsoReported: [
      { name: "Republic Online", url: "https://myrepubliconline.com/mtn-foundation-unveils-stem-library-at-wiamoase/" },
    ],
  },
  {
    id: "half-million-dollar-centre-inaugurated",
    title: "Diaspora inaugurates the $500,000 Learning Development Centre",
    dek: "Two years of voluntary contributions by Wiamoase citizens abroad produced a conference centre, a community library with offices, and a standby water supply.",
    category: "Milestones",
    date: "2022-04-19",
    readMinutes: 4,
    image: img("photo-1511795409834-ef04bbd61622", 1200),
    imageAlt: GENERIC_ALT,
    body: [
      "A $500,000 complex built by Wiamoase citizens living abroad was inaugurated in April 2022, funded entirely from the voluntary contributions of members. The two-storey Learning Development Centre comprises a well-furnished conference centre, a community library with offices and relevant books, and a standby regular water supply system.",
      "The citizens of the town formed a union not only for solidarity and socialising, but to pool resources for socio-economic development projects at home. The inauguration was marked by a durbar of the chiefs and people of Wiamoase attended by government functionaries, academics and clergy.",
      "Mrs Akosua Fremah Osei Opare, Chief of Staff at the Presidency and a native of the town, commended the sacrifices of the diaspora and pledged her own support, encouraging other Ghanaians abroad to learn from the group's commitment. The occasion also saw plaques of citation presented to selected personalities.",
      "Dr Daniel Apau Ohyeaman, Chairman of the Wiamoase Citizens in the Diaspora, said the group would use the facility to advance the development of children with special needs from the town. Dr Osei Yaw Adutwum, then Minister for Education, advised pupils and students to take advantage of the centre to improve their academics.",
      "A separate report the same week noted that a maternity block was also inaugurated at the Seventh Day Adventist Hospital in Wiamoase, and that Mrs Osei Opare undertook to help stock the library with books and computers.",
    ],
    pullQuote: {
      text: "We will use the facility to advance the development of particularly children with special needs who come from the town.",
      attribution: "Dr Daniel Apau Ohyeaman, Chairman, Wiamoase Citizens in the Diaspora",
    },
    people: [
      { name: "Dr Daniel Apau Ohyeaman", role: "Chairman, Wiamoase Citizens in the Diaspora" },
      { name: "Akosua Fremah Osei Opare", role: "Chief of Staff at the Presidency" },
      { name: "Osei Yaw Adutwum", role: "Minister for Education" },
      { name: "Nana Boakye Yiadom", role: "Chief of Wiamoase" },
    ],
    source: {
      name: "GBC Ghana Online",
      url: "https://www.gbcghanaonline.com/general/wiamoase-citizens-in-diaspora-build-500-thousand-facility-for-indigenes/2022/",
      published: "19 April 2022",
    },
    alsoReported: [
      { name: "Ghanaian Times", url: "https://ghanaiantimes.com.gh/learning-centre-maternity-block-inaugurated-at-wiamoase/" },
    ],
  },
];

export const newsCategories: NewsCategory[] = ["STEM", "Milestones", "Community", "Diaspora", "Skills"];

export const newsById = (id: string) => newsPosts.find((p) => p.id === id);

/** Newest first. */
export const newsSorted = [...newsPosts].sort((a, b) => b.date.localeCompare(a.date));

export const featuredPost = newsSorted.find((p) => p.featured) ?? newsSorted[0];

export function formatNewsDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}