import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeroSection from "@/containers/home/HeroSection";
import MovieFilter from "@/containers/home/MovieFilter";
import MovieGrid from "@/containers/home/MovieGrid";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MovieFilter />
      <MovieGrid/>
      <Footer />
    </div>
  );
}
