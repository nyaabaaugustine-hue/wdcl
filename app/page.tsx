import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import BookStream from "@/components/BookStream";
import HeroSlider from "@/components/HeroSlider";
import Overview from "@/components/Overview";
import Story from "@/components/Story";
import Facilities from "@/components/Facilities";
import Clubs from "@/components/Clubs";
import HappeningNow from "@/components/HappeningNow";
import Testimonials from "@/components/Testimonials";
import Support from "@/components/Support";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <BookStream />
      <section className="slider-sec" aria-label="Photographs of the centre">
        <div className="container">
          <HeroSlider />
        </div>
      </section>
      <Overview />
      <Story />
      <Facilities />
      <Clubs />
      <HappeningNow />
      <Testimonials />
      <Support />
      <Visit />
    </>
  );
}
