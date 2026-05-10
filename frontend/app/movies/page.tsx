'use client';

import { useState, useMemo } from "react";
import MovieHeader from "./_components/MovieHeader";
import MovieFilters from "./_components/MovieFilters";
import MovieGrid from "./_components/MovieGrid";
import MovieSortControls from "./_components/MovieSortControls";
import Pagination from "./_components/Pagination";
import EmptyState from "./_components/MovieEmptyState";
import { useMovie } from "@/contexts/MovieContext";
import { Movie } from "@/interfaces/movieInterface";

export default function Movies() {
  const { movies, isLoading, error } = useMovie();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('Popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const moviesPerPage = 9;

  const allGenres = useMemo(() => 
    Array.from(new Set(movies.flatMap(movie => movie.genres))).sort(),
  [movies]);

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    movies.forEach(movie => {
      if (Array.isArray(movie.languages)) {
        movie.languages.forEach(l => langs.add(l));
      } else if (typeof movie.languages === 'string') {
        (movie.languages as string).split(',').forEach(l => langs.add(l.trim()));
      }
    });
    return ['All', ...Array.from(langs).sort()];
  }, [movies]);

  const ratings = [
    { value: '4', label: '★★★★★' },
    { value: '3.2', label: '★★★★☆' },
    { value: '2.4', label: '★★★☆☆' },
    { value: '1.6', label: '★★☆☆☆' },
    { value: '0.8', label: '★☆☆☆☆' },
  ];

  const filteredMovies = useMemo<Movie[]>(() => {
    const filtered = movies.map(movie => {
        const avgRating = movie.reviews && movie.reviews.length > 0
            ? movie.reviews.reduce((acc, r) => acc + r.rating, 0) / movie.reviews.length
            : 0;
        return { ...movie, averageRating: avgRating };
    });

    const genreFiltered = selectedGenres.length > 0
      ? filtered.filter(movie => movie.genres.some(genre => selectedGenres.includes(genre)))
      : filtered;

    const languageFiltered = selectedLanguage !== 'All'
      ? genreFiltered.filter(movie => {
          if (Array.isArray(movie.languages)) {
            return movie.languages.some(l => l.toLowerCase() === selectedLanguage.toLowerCase());
          }
          return (movie.languages as string).toLowerCase().includes(selectedLanguage.toLowerCase());
        })
      : genreFiltered;

    const ratingFiltered = selectedRating
      ? languageFiltered.filter(movie => movie.averageRating >= parseFloat(selectedRating))
      : languageFiltered;

    return ratingFiltered.sort((a, b) => {
      switch (sortBy) {
        case 'Popularity':
          return b.averageRating - a.averageRating;
        case 'Release Date':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'Rating (High to Low)':
          return b.averageRating - a.averageRating;
        case 'Rating (Low to High)':
          return a.averageRating - b.averageRating;
        default:
          return 0;
      }
    });
  }, [movies, selectedGenres, selectedLanguage, selectedRating, sortBy]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-text-secondary animate-pulse">Loading amazing movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 bg-surface-dark rounded-2xl border border-primary/20 max-w-md">
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
              <MovieGrid movies={currentMovies as any} viewMode={viewMode} />
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
