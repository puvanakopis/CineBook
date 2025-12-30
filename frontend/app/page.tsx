import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeroSection from "@/containers/home/HeroSection";
import MovieFilter from "@/containers/home/MovieFilter";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MovieFilter />
      <Footer />
    </div>
  );
}
