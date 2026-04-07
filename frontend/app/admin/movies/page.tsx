'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMovie } from '@/contexts/MovieContext';
import { MovieHeader } from './_components/MovieHeader';
import { MovieStatsGrid } from './_components/MovieStatsGrid';
import { MovieFilters } from './_components/MovieFilters';
import { MovieTable } from './_components/MovieTable';
import { MovieModal } from './_components/MovieModal';
import { DeleteConfirmModal } from './_components/DeleteConfirmModal';
import { Movie } from '@/interfaces/movieInterface';

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

export default function AdminMovies() {
  const { movies, isLoading, deleteMovie } = useMovie();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  const allGenres = useMemo(
    () => Array.from(new Set(movies.flatMap((movie) => movie.genres))).sort(),
    [movies]
  );

  useEffect(() => {
    console.log('All movies:', movies);
  }, [movies]);

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
  }, [movies, searchQuery, selectedGenre, selectedRating, selectedStatus]);

  const nowShowing = movies.filter((movie) => getReleaseStatus(movie.releaseDate) === 'Now Showing').length;
  const comingSoon = movies.filter((movie) => getReleaseStatus(movie.releaseDate) === 'Coming Soon').length;
  const archived = movies.filter((movie) => getReleaseStatus(movie.releaseDate) === 'Archived').length;

  const handleAddMovie = () => {
    setSelectedMovie(undefined);
    setIsModalOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (movie: Movie) => {
    setMovieToDelete(movie);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (movieToDelete) {
      await deleteMovie(movieToDelete._id);
      setIsDeleteModalOpen(false);
      setMovieToDelete(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(undefined);
  };

  return (
    <>
      <MovieHeader onAddMovie={handleAddMovie} />
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
          isLoading={isLoading}
          getReleaseStatus={getReleaseStatus}
          getAgeRating={getAgeRating}
          onEdit={handleEditMovie}
          onDelete={handleDeleteClick}
        />
      </div>

      <MovieModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        movie={selectedMovie}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        movieTitle={movieToDelete?.title}
      />
    </>
  );
}