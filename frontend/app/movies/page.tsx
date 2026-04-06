'use client';

import { useState, useMemo } from "react";
import MovieHeader from "./_components/MovieHeader";
import MovieFilters from "./_components/MovieFilters";
import MovieGrid from "./_components/MovieGrid";
import MovieSortControls from "./_components/MovieSortControls";
import Pagination from "./_components/Pagination";
import EmptyState from "./_components/MovieEmptyState";
import { movies } from '@/data/movie';
import { Movie } from '@/interfaces/movie';

export default function Movies() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const moviesPerPage = 9;

  const allGenres = Array.from(new Set(movies.flatMap(movie => movie.genres))).sort();

  const allLanguages = ['All', ...Array.from(
    new Set(movies.flatMap(movie => movie.languages.split(',').map(lang => lang.trim())))
  ).sort()];

  const ratings = [
    { value: '4', label: '★★★★★' },
    { value: '3.2', label: '★★★★☆' },
    { value: '2.4', label: '★★★☆☆' },
    { value: '1.6', label: '★★☆☆☆' },
    { value: '0.8', label: '★☆☆☆☆' },
  ];

  const filteredMovies = useMemo<Movie[]>(() => {
    const filtered = movies.slice();

    const genreFiltered = selectedGenres.length > 0
      ? filtered.filter(movie => movie.genres.some(genre => selectedGenres.includes(genre)))
      : filtered;

    const languageFiltered = selectedLanguage !== 'All'
      ? genreFiltered.filter(movie => movie.languages.toLowerCase().includes(selectedLanguage.toLowerCase()))
      : genreFiltered;

    const ratingFiltered = selectedRating
      ? languageFiltered.filter(movie => movie.rating >= parseFloat(selectedRating))
      : languageFiltered;

    return ratingFiltered.sort((a, b) => {
      switch (sortBy) {
        case 'Popularity':
          return b.rating - a.rating;
        case 'Release Date':
          return parseInt(b.releaseDate) - parseInt(a.releaseDate);
        case 'Rating (High to Low)':
          return b.rating - a.rating;
        case 'Rating (Low to High)':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  }, [selectedGenres, selectedLanguage, selectedRating, sortBy]);

  const handleGenreToggle = (genre: string) => {
    setCurrentPage(1);
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCurrentPage(1);
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating);
    setCurrentPage(1);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguage('All');
    setSelectedRating('');
    setCurrentPage(1);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const filterProps = {
    selectedDate,
    setSelectedDate: handleDateChange,
    selectedGenres,
    selectedLanguage,
    setSelectedLanguage: handleLanguageChange,
    selectedRating,
    setSelectedRating: handleRatingChange,
    allGenres,
    allLanguages,
    ratings,
    handleGenreToggle,
    handleClearFilters,
  };

  return (
    <div>
      <MovieHeader />
      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full px-4 md:px-10 lg:px-20 py-10 gap-8">
        <MovieFilters {...filterProps} />

        <div className="flex-1">
          <MovieSortControls
            filteredMoviesCount={filteredMovies.length}
            indexOfFirstMovie={indexOfFirstMovie}
            indexOfLastMovie={indexOfLastMovie}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {currentMovies.length > 0 ? (
            <>
              <MovieGrid movies={currentMovies} viewMode={viewMode} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <EmptyState onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>
    </div>
  );
}