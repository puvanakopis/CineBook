'use client';

import MovieCard from "./MovieCard";
import { Movie } from '@/interface/movie';

interface MovieGridProps {
    movies: Movie[];
}

const MovieGrid = ({ movies }: MovieGridProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
                <MovieCard key={movie.movie_id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieGrid;