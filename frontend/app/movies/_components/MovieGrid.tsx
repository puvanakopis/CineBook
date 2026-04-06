'use client';

import MovieCard from "./MovieCard";
import { Movie } from '@/interfaces/movie';

interface MovieGridProps {
    movies: Movie[];
    viewMode: 'grid' | 'list';
}

const MovieGrid = ({ movies, viewMode }: MovieGridProps) => {
    return (
        <div className={viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-6"
        }>
            {movies.map((movie) => (
                <MovieCard key={movie.movie_id} movie={movie} viewMode={viewMode} />
            ))}
        </div>
    );
};

export default MovieGrid;