"use client";

import { useParams } from "next/navigation";
import MovieHero from "@/containers/movieDetail/MovieHero";
import Showtimes from "@/containers/movieDetail/Showtimes";
import CastCrew from "@/containers/movieDetail/CastCrew";
import Reviews from "@/containers/movieDetail/Reviews";
import { movies } from "@/data/movie";

export default function MovieDetail() {
  const params = useParams();
  const movieId = params?.id ? parseInt(params.id as string) : null;

  const movie = movies.find((m) => m.movie_id === movieId);

  if (!movie) {
    return (
      <main>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Movie Not Found</h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
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
      <Reviews reviews={movie.reviews} movieTitle={movie.title} movieId={movie.movie_id.toString()} />
    </main>
  );
}