"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MovieHero from "@/containers/movieDetail/MovieHero";
import Showtimes from "@/containers/movieDetail/Showtimes";
import CastCrew from "@/containers/movieDetail/CastCrew";
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
        poster={movie.poster}
        trailerUrl={movie.trailerUrl}
      />
      <Showtimes theaters={movie.theaters} />
      <CastCrew cast={movie.cast} />
      <Footer />
    </main>
  );
}