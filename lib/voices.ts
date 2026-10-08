export type Theme = "light" | "brand" | "dark";

export type Voice = {
  quote: string;
  role: string;
  img: string;
  theme: Theme;
  large?: boolean;
};

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=120&h=120&q=70`;

export const voices: Voice[] = [
  {
    quote: "A quiet place to read, a bright place to learn — all under one roof.",
    role: "Parent, Agono Wiamoase",
    img: photo("photo-1531482615713-2afd69097998"),
    theme: "brand",
    large: true,
  },
  {
    quote: "My daughter found the Reading Club the week we moved back.",
    role: "Reading Club member",
    img: photo("photo-1519865885898-a54a6f2c7eea"),
    theme: "light",
  },
  {
    quote: "I wrote my first lines of code here.",
    role: "Coding Club member",
    img: photo("photo-1522071820081-009f0129c71c"),
    theme: "dark",
  },
  {
    quote: "The mentors here make robotics feel beginner-friendly.",
    role: "Robotics Club mentor",
    img: photo("photo-1532619675605-1ede6c2ed2b0"),
    theme: "light",
  },
  {
    quote: "This is where our studies get a lift after school.",
    role: "Student, Okomfo Anokye SHS",
    img: photo("photo-1459749411175-04bf5292ceea"),
    theme: "dark",
  },
  {
    quote: "We hosted our conference in the hall and the team made it easy.",
    role: "Conference centre guest",
    img: photo("photo-1416339306562-f3d12fefd36f"),
    theme: "light",
  },
  {
    quote: "Coming home to give back — this feels like the start of something.",
    role: "Volunteer from the diaspora",
    img: photo("photo-1439792675105-701e6a4ab6f0"),
    theme: "dark",
    large: true,
  },
];
