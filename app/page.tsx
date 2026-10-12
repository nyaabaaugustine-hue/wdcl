import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import QuickActions from "@/components/QuickActions";
import DirectorWelcome from "@/components/DirectorWelcome";
import Overview from "@/components/Overview";
import Story from "@/components/Story";
import OurStory from "@/components/OurStory";
import Facilities from "@/components/Facilities";
import Clubs from "@/components/Clubs";
import FacilitiesCards from "@/components/FacilitiesCards";
import ClubsCards from "@/components/ClubsCards";
import HappeningNow from "@/components/HappeningNow";
import UpcomingSessions from "@/components/UpcomingSessions";
import Support from "@/components/Support";
import Visit from "@/components/Visit";
import DigitalLibrary from "@/components/DigitalLibrary";

/*
 * UNDO SWITCH: set MERGED_STORY to false to bring back the previous homepage
 * (DirectorWelcome + Overview + Story as three separate sections).
 * A copy of the original page also lives in
 * design-backups/homepage-before-merge/page.tsx.txt
 */
const MERGED_STORY = true;

/*
 * UNDO SWITCH 2: set NEW_CARDS to false to bring back the hover-swap Facilities
 * and the tabbed Clubs. (Copy of the page before this change:
 * design-backups/homepage-before-merge/page-before-cards.tsx.txt)
 */
const NEW_CARDS = true;

/*
 * Homepage kept deliberately short. Reserved/hidden until real content exists:
 *  - BookStream (invented covers) and Testimonials (sample voices): hidden.
 *  - HeroSlider: its photos live in HappeningNow's gallery strip.
 *  - SmallActs: standalone on /about; on Home it is merged into Support.
 * With MERGED_STORY on, Overview + Story are one section (OurStory) and the
 * Director's note lives on /about, with a link from the story section.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <QuickActions />
      <DigitalLibrary />
      <StatsBand />
      {MERGED_STORY ? (
        <OurStory />
      ) : (
        <>
          <DirectorWelcome />
          <Overview />
          <Story />
        </>
      )}
      {NEW_CARDS ? (
        <>
          <FacilitiesCards />
          <ClubsCards />
        </>
      ) : (
        <>
          <Facilities />
          <Clubs />
        </>
      )}
      <UpcomingSessions />
      <HappeningNow />
      <Support showSmallActs />
      <Visit />
    </>
  );
}
