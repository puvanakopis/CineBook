import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutHeroSection from "@/containers/about/AboutHeroSection";
import AboutSection from "@/containers/about/AboutSection";

export default function About() {
  return (
    <div>
      <Navbar />
      <AboutHeroSection />
      <AboutSection/>
      <Footer />
    </div>
  );
}
