/**
 * Facts about the Ghana Library Authority's free "Ghana Library" app, which
 * the Wiamoase library (a GhLA branch) points readers to. Sources: the app's
 * App Store listing and Ghana News Agency coverage. The app is run by the
 * Ghana Library Authority, not by the Wiamoase centre.
 */
export const digitalLibrary = {
  appName: "Ghana Library",
  appStoreUrl: "https://apps.apple.com/gh/app/ghana-library/id1464674859",
  // Search link: swap for the direct Google Play listing URL once confirmed.
  playStoreUrl: "https://play.google.com/store/search?q=Ghana%20Library%20Authority&c=apps",
  supportEmail: "innovation@ghanalibrary.org",

  formats: [
    {
      icon: "book",
      title: "E-books",
      text: "Fiction and non-fiction for every age, from well-loved classics to everyday reading.",
    },
    {
      icon: "headphones",
      title: "Audiobooks",
      text: "Listen on the go, at home or on the road, without needing to read from a screen.",
    },
    {
      icon: "play",
      title: "Educational videos",
      text: "Tutorials and lessons that help with school subjects, from Kindergarten to Senior High.",
    },
  ],

  steps: [
    {
      title: "Download the free app",
      text: "Search for “Ghana Library” by the Ghana Library Authority on the App Store or Google Play.",
    },
    {
      title: "Sign up",
      text: "Register with your email address or phone number. You do not need a library card.",
    },
    {
      title: "Check your email",
      text: "Your sign-in details are sent to the email you registered with. Check your spam folder if they take a while, then start reading.",
    },
  ],

  features: [
    {
      title: "Free membership",
      text: "Joining costs nothing and opens up every e-book, audiobook and video in the app.",
    },
    {
      title: "Matched to school",
      text: "Content follows the Ghanaian curriculum from Kindergarten through Senior High School.",
    },
    {
      title: "Find My Library",
      text: "See the Ghana Library branches on a map and get directions to the nearest one.",
    },
    {
      title: "My Shelf",
      text: "Every e-book, audiobook and video you open is saved in one place for next time.",
    },
  ],
} as const;
