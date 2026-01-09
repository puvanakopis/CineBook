"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MovieHeader from "@/containers/movies/Header";

export default function Movies() {
  return (
    <div>
      <Navbar />
      <MovieHeader />
      <Footer />
    </div>
  );
}
