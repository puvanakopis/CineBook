import HeroSection from "@/containers/home/HeroSection";
import MovieFilter from "@/containers/home/MovieFilter";
import MovieGrid from "@/containers/home/MovieGrid";
import OfferSection from "@/containers/home/OfferSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MovieFilter />
      <MovieGrid />
      <OfferSection />
    </div>
  );
}
