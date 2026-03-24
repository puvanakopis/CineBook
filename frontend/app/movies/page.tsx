'use client';

import { useState, useEffect } from "react";
import MovieHeader from "@/containers/movies/MovieHeader";
import MovieFilters from "@/containers/movies/MovieFilters";
import MovieGrid from "@/containers/movies/MovieGrid";
import SortControls from "@/containers/movies/SortControls";
import Pagination from "@/containers/movies/Pagination";
import EmptyState from "@/containers/movies/EmptyState";
import { movies } from '@/data/movie';
import { Movie } from '@/interface/movie';

export default function Movies() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Popularity');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies as Movie[]);

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

  useEffect(() => {
    let filtered = [...movies] as Movie[];

    if (selectedGenres.length > 0) {
      filtered = filtered.filter(movie =>
        movie.genres.some(genre => selectedGenres.includes(genre))
      );
    }

    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(movie =>
        movie.languages.toLowerCase().includes(selectedLanguage.toLowerCase())
      );
    }

    if (selectedRating) {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(movie => movie.rating >= minRating);
    }

    filtered.sort((a, b) => {
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

    setFilteredMovies(filtered);
    setCurrentPage(1);
  }, [selectedGenres, selectedLanguage, selectedRating, sortBy]);

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguage('All');
    setSelectedRating('');
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const filterProps = {
    selectedDate,
    setSelectedDate,
    selectedGenres,
    selectedLanguage,
    setSelectedLanguage,
    selectedRating,
    setSelectedRating,
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
          <SortControls
            filteredMoviesCount={filteredMovies.length}
            indexOfFirstMovie={indexOfFirstMovie}
            indexOfLastMovie={indexOfLastMovie}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {currentMovies.length > 0 ? (
            <>
              <MovieGrid movies={currentMovies} />
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