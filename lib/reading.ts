/**
 * Reading lists for /collection.
 *
 * DEMO DATA: these are real, well-known books chosen as examples of how a list looks. They are
 * NOT a record of what is on the library's shelves. Replace them with the librarians' own picks,
 * then set `DEMO_READING` to false.
 */
export const DEMO_READING = true;

export type ReadingList = {
  id: string;
  title: string;
  blurb: string;
  books: { title: string; author: string }[];
};

export const readingLists: ReadingList[] = [
  {
    id: "ghanaian-voices",
    title: "Ghanaian voices",
    blurb: "Novels and plays by Ghanaian writers, old and new.",
    books: [
      { title: "Anowa", author: "Ama Ata Aidoo" },
      { title: "The Beautyful Ones Are Not Yet Born", author: "Ayi Kwei Armah" },
      { title: "The Marriage of Anansewa", author: "Efua T. Sutherland" },
      { title: "Homegoing", author: "Yaa Gyasi" },
      { title: "Ghana Must Go", author: "Taiye Selasi" },
    ],
  },
  {
    id: "young-readers",
    title: "For young readers",
    blurb: "Stories for children and teenagers to read alone or aloud.",
    books: [
      { title: "Chike and the River", author: "Chinua Achebe" },
      { title: "Anna Hibiscus", author: "Atinuke" },
      { title: "The Upright Revolution", author: "Ngũgĩ wa Thiong'o" },
      { title: "Unbowed", author: "Wangari Maathai" },
    ],
  },
  {
    id: "curious-minds",
    title: "For curious minds",
    blurb: "Science, technology and making things, to go with the labs and clubs.",
    books: [
      { title: "The Boy Who Harnessed the Wind", author: "William Kamkwamba and Bryan Mealer" },
      { title: "Hidden Figures", author: "Margot Lee Shetterly" },
      { title: "Python Crash Course", author: "Eric Matthes" },
    ],
  },
];
