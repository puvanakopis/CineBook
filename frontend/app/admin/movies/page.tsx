'use client';

import { useMemo, useState } from 'react';
import { useMovie } from '@/contexts/MovieContext';
import { MovieHeader } from './_components/MovieHeader';
import { MovieStatsGrid } from './_components/MovieStatsGrid';
import { MovieFilters } from './_components/MovieFilters';
import { MovieTable } from './_components/MovieTable';
import { AddEditModal } from './_components/AddEditModal';
import { DeleteModal } from './_components/DeleteModal';
import { Movie } from '@/interfaces/movieInterface';
import Loading from '@/components/Loading';

const ageRatings = ['G', 'PG', 'PG-13', 'R'];
const releaseStatuses = ['Now Showing', 'Coming Soon'];

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
  const [selectedStatus, setSelectedStatus] = useState('Now Showing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  const allGenres = useMemo(
    () => Array.from(new Set(movies.flatMap((movie) => movie.genres))).sort(),
    [movies]
  );

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const status = getReleaseStatus(movie.releaseDate);
      // exclude archived movies entirely
      if (status === 'Archived') return false;

      const searchMatch =
        !searchQuery ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase()));

      const genreMatch =
        selectedGenre === 'All Genres' || movie.genres.includes(selectedGenre);

      const ratingMatch =
        selectedRating === 'All Ratings' || getAgeRating(movie) === selectedRating;

      const statusMatch = status === selectedStatus;

      return searchMatch && genreMatch && ratingMatch && statusMatch;
    });
  }, [movies, searchQuery, selectedGenre, selectedRating, selectedStatus]);

  const nowShowing = movies.filter((movie) => getReleaseStatus(movie.releaseDate) === 'Now Showing').length;
  const comingSoon = movies.filter((movie) => getReleaseStatus(movie.releaseDate) === 'Coming Soon').length;
  const total = movies.filter((movie) => getReleaseStatus(movie.releaseDate) !== 'Archived').length;

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
    if (movieToDelete && movieToDelete._id) {
      await deleteMovie(movieToDelete._id);
      setIsDeleteModalOpen(false);
      setMovieToDelete(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(undefined);
  };

  if (isLoading) {
    return <Loading message="Loading Movies..." />;
  }

  return (
    <>
      <MovieHeader onAddMovie={handleAddMovie} />
      <MovieStatsGrid
        total={total}
        nowShowing={nowShowing}
        comingSoon={comingSoon}
        totalGenres={allGenres.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
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
        </div>

        <div className="lg:col-span-3">
          <MovieTable
            movies={filteredMovies}
            isLoading={isLoading}
            getReleaseStatus={getReleaseStatus}
            getAgeRating={getAgeRating}
            onEdit={handleEditMovie}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      <AddEditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        movie={selectedMovie}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        movieTitle={movieToDelete?.title}
      />
    </>
  );
}