/**
 * Facts about the Ghana Library Authority (GhLA), the national agency this
 * library belongs to. Sources: the Authority's brochure and website
 * (library.gov.gh), its Executive Director's comments reported by the Graphic
 * Online, and coverage of its 2021 award. These describe the Authority as a
 * whole, not the Wiamoase centre.
 */
export const AUTHORITY_URL = "https://www.library.gov.gh/";

export const authorityFacts = [
  { value: "1950", label: "Founded as the Ghana Library Board" },
  { value: "139", label: "Libraries managed across Ghana, as reported by the Authority" },
  { value: "2021", label: "Named Library of the Year at the London Book Fair International Excellence Awards" },
  { value: "Act 327", label: "The 1970 law that gives the Authority its mandate" },
] as const;

export const authorityVision = "To connect every Ghanaian to knowledge resources.";

export const authorityServices = [
  { icon: "grad", title: "Research support", text: "Help finding information for study and research." },
  { icon: "pin", title: "Mobile library", text: "Library vans that bring books and ICT resources to communities." },
  { icon: "book", title: "Book box", text: "Books taken out to places that do not have a library." },
  { icon: "book", title: "Bindery", text: "Repair and binding of books and documents." },
  { icon: "phone", title: "Digital library", text: "Free e-books, audiobooks and videos through the Ghana Library app." },
  { icon: "heart", title: "Children's library", text: "Reading spaces and activities made for children." },
  { icon: "users", title: "Extension services", text: "Taking library services out into communities." },
  { icon: "code", title: "Technology support", text: "Help with ICT tools and digital skills." },
  { icon: "check", title: "Consultancy", text: "Advice on setting up and running libraries." },
] as const;
