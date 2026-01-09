"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MovieHeader from "@/containers/movies/Header";
import MoviesPage from "@/containers/movies/MoviesPage";

export default function Movies() {
  return (
    <div>
      <Navbar />
      <MovieHeader />
      <MoviesPage />
      <Footer />
    </div>
  );
}
