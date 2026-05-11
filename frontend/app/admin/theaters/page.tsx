'use client';

import { useMemo, useState } from 'react';
import { useMovie } from '@/contexts/MovieContext';
import { useTheater } from '@/contexts/TheaterContext';
import { Theater } from '@/interfaces/theaterInterface';
import { TheaterHeader } from './_components/TheaterHeader';
import { TheaterStatsGrid } from './_components/TheaterStatsGrid';
import { TheaterTable } from './_components/TheaterTable';
import { TheaterFilters } from './_components/TheaterFilters';
import { AddEditModal } from './_components/AddEditModal';
import { DeleteModal } from './_components/DeleteModal';
import Loading from '@/components/Loading';

const getAssignedMovieCount = (theater: Theater) => theater.movies?.length ?? 0;

export default function AdminTheatersPage() {
  const { theaters, isLoading, error, deleteTheater } = useTheater();
  const { movies, isLoading: isMoviesLoading } = useMovie();

  const safeTheaters = useMemo(
    () => theaters.filter((theater): theater is Theater => Boolean(theater && theater._id && theater.city)),
    [theaters]
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState<Theater | undefined>(undefined);
  const [theaterToDelete, setTheaterToDelete] = useState<Theater | null>(null);

  const allCities = useMemo(
    () => Array.from(new Set(safeTheaters.map((theater) => theater.city).filter(Boolean))).sort(),
    [safeTheaters]
  );

  const filteredTheaters = useMemo(() => {
    return safeTheaters.filter((theater) => {
      const searchMatch =
        !searchQuery ||
        theater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theater.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theater.city.toLowerCase().includes(searchQuery.toLowerCase());

      const cityMatch = selectedCity === 'All Cities' || theater.city === selectedCity;

      return searchMatch && cityMatch;
    });
  }, [safeTheaters, searchQuery, selectedCity]);

  const theatersWithMovies = safeTheaters.filter((theater) => getAssignedMovieCount(theater) > 0).length;
  const theatersWithoutMovies = safeTheaters.length - theatersWithMovies;
  const totalMoviesAssigned = safeTheaters.reduce((sum, theater) => sum + getAssignedMovieCount(theater), 0);

  const handleAddTheater = () => {
    setSelectedTheater(undefined);
    setIsModalOpen(true);
  };

  const handleEditTheater = (theater: Theater) => {
    setSelectedTheater(theater);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (theater: Theater) => {
    setTheaterToDelete(theater);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!theaterToDelete) return;
    await deleteTheater(theaterToDelete._id);
    setIsDeleteModalOpen(false);
    setTheaterToDelete(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTheater(undefined);
  };

  if (isLoading || isMoviesLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-300">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <TheaterHeader onAddTheater={handleAddTheater} />

      <TheaterStatsGrid
        total={safeTheaters.length}
        withMovies={theatersWithMovies}
        withoutMovies={theatersWithoutMovies}
        totalMoviesAssigned={totalMoviesAssigned}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
        <TheaterFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          cities={allCities}
        />

        <TheaterTable
          theaters={filteredTheaters}
          onEdit={handleEditTheater}
          onDelete={handleDeleteClick}
        />
      </div>

      <AddEditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        theater={selectedTheater}
        movies={movies}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        theaterName={theaterToDelete?.name}
      />
    </>
  );
}