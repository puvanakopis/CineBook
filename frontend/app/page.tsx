import HomeHeroSection from "./_components/HomeHeroSection";
import HomeMovieFilter from "./_components/HomeMovieFilter";
import HomeMovieGrid from "./_components/HomeMovieGrid";
import HomeOfferSection from "./_components/HomeOfferSection";

export default function Home() {
  return (
    <div>
      <HomeHeroSection />
      <HomeMovieFilter />
      <HomeMovieGrid />
      <HomeOfferSection />
    </div>
  );
}
