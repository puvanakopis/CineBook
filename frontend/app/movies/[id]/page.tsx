"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MovieHero from "@/containers/movieDetail/MovieHero";
import { movie } from "@/data/movie";

export default function MovieDetail() {
  return (
    <main>
      <Navbar />
      <MovieHero
        title={movie.title}
        rating={movie.rating}
        genres={movie.genres}
        duration={movie.duration}
        releaseDate={movie.releaseDate}
        languages={movie.languages}
        formats={movie.formats}
        synopsis={movie.synopsis}
        posterUrl={movie.posterUrl}
        backgroundUrl={movie.backgroundUrl}
      />
      <Footer />
    </main>
  );
}