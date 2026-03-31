'use client';

import { useMemo, useState } from 'react';
import { DashboardHeader } from '../_components/DashboardHeader';
import { MovieHeader } from './_components/MovieHeader';
import { MovieStatsGrid } from './_components/MovieStatsGrid';
import { MovieFilters } from './_components/MovieFilters';
import { MovieTable } from './_components/MovieTable';
import { movies } from '@/data/movie';
import { Movie } from '@/interface/movie';

const ageRatings = ['G', 'PG', 'PG-13', 'R'];
const releaseStatuses = ['All Statuses', 'Now Showing', 'Coming Soon', 'Archived'];

const getAgeRating = (movie: Movie) => {
  const index = movie.title.length % ageRatings.length;
  return ageRatings[index];
};

const getReleaseStatus = (releaseDate: string) => {
  const year = parseInt(releaseDate, 10);
  if (Number.isNaN(year)) return 'Archived';

  const currentYear = new Date().getFullYear();
  if (year > currentYear) return 'Coming Soon';
  if (year === currentYear || year === currentYear - 1) return 'Now Showing';
  return 'Archived';
};

export default function AdminMoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  const allGenres = useMemo(
    () => Array.from(new Set(movies.flatMap((movie) => movie.genres))).sort(),
    []
  );

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const searchMatch =
        !searchQuery ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase()));

      const genreMatch =
        selectedGenre === 'All Genres' || movie.genres.includes(selectedGenre);

      const ratingMatch =
        selectedRating === 'All Ratings' || getAgeRating(movie) === selectedRating;

      const statusMatch =
        selectedStatus === 'All Statuses' || getReleaseStatus(movie.releaseDate) === selectedStatus;

      return searchMatch && genreMatch && ratingMatch && statusMatch;
    });
  }, [searchQuery, selectedGenre, selectedRating, selectedStatus]);

  const nowShowing = movies.filter((movie) => getReleaseStatus(movie.releaseDate) === 'Now Showing').length;
  const comingSoon = movies.filter((movie) => getReleaseStatus(movie.releaseDate) === 'Coming Soon').length;
  const archived = movies.filter((movie) => getReleaseStatus(movie.releaseDate) === 'Archived').length;

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-10">
            <MovieHeader />
            <MovieStatsGrid
              total={movies.length}
              nowShowing={nowShowing}
              comingSoon={comingSoon}
              archived={archived}
            />

            <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
              <MovieFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                genres={allGenres}
                ageRatings={ageRatings}
                releaseStatuses={releaseStatuses}
              />

              <MovieTable
                movies={filteredMovies}
                getReleaseStatus={getReleaseStatus}
                getAgeRating={getAgeRating}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
