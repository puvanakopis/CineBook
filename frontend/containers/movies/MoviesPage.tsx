'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlineMovieCreation } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { movies } from '@/data/movie';

interface Movie {
    id: number;
    title: string;
    rating: number;
    genres: string[];
    duration: string;
    releaseDate: string;
    languages: string;
    formats: string;
    synopsis: string;
    poster: string;
    trailerUrl: string;
    theaters: any[];
    cast: any[];
    reviews: any[];
}

const MoviesPage = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>(['Action']);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
    const [selectedRating, setSelectedRating] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('Popularity');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
    const moviesPerPage = 9;

    const router = useRouter();

    // Extract unique genres from movies data
    const allGenres = Array.from(
        new Set(movies.flatMap(movie => movie.genres))
    ).sort();

    // Extract unique languages from movies data
    const allLanguages = Array.from(
        new Set(movies.flatMap(movie => movie.languages.split(',').map(lang => lang.trim())))
    ).sort();

    const ratings = [
        { value: '5', label: '★★★★★' },
        { value: '4', label: '★★★★☆' },
        { value: '3', label: '★★★☆☆' },
        { value: '2', label: '★★☆☆☆' },
        { value: '1', label: '★☆☆☆☆' },
    ];

    // Apply filters whenever filter criteria change
    useEffect(() => {
        let filtered = [...movies];

        // Apply genre filter
        if (selectedGenres.length > 0) {
            filtered = filtered.filter(movie =>
                movie.genres.some(genre => selectedGenres.includes(genre))
            );
        }

        // Apply language filter
        if (selectedLanguage !== 'English') {
            filtered = filtered.filter(movie =>
                movie.languages.toLowerCase().includes(selectedLanguage.toLowerCase())
            );
        }

        // Apply rating filter
        if (selectedRating) {
            const minRating = parseFloat(selectedRating) * 2;
            filtered = filtered.filter(movie => movie.rating >= minRating);
        }

        // Apply sorting
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

    // Calculate total pages
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    // Get current movies to display
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handleGenreToggle = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            // Calculate start and end of visible pages
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're at the beginning
            if (currentPage <= 3) {
                endPage = 4;
            }

            // Adjust if we're at the end
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pageNumbers.push('...');
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }

            // Always show last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full px-4 md:px-10 lg:px-20 py-10 gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                {/* Show Date */}
                <div className="pb-6 border-b border-[#392828]">
                    <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                        Show Date
                        <span className="material-symbols-outlined text-text-secondary text-sm"><MdCalendarMonth /></span>
                    </h3>
                    <div className="space-y-2">
                        {['Today', 'Tomorrow', 'This Weekend'].map((date) => (
                            <label key={date} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="rounded accent-primary border-[#392828] bg-input-bg text-primary focus:ring-primary focus:ring-offset-background-dark w-4 h-4"
                                    type="checkbox"
                                />
                                <span className="text-text-secondary group-hover:text-white transition-colors text-sm">
                                    {date}
                                </span>
                            </label>
                        ))}
                        <div className="pt-2">
                            <input
                                className="w-full accent-primary bg-input-bg border border-[#392828] rounded px-3 py-2 text-sm text-text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Genre */}
                <div className="pb-6 border-b border-[#392828]">
                    <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                        Genre
                        <span className="material-symbols-outlined text-text-secondary text-sm"><MdOutlineMovieCreation /></span>
                    </h3>
                    <div className="space-y-2">
                        {allGenres.map((genre) => (
                            <label key={genre} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="rounded accent-primary border-[#392828] bg-input-bg text-primary focus:ring-primary focus:ring-offset-background-dark w-4 h-4"
                                    type="checkbox"
                                    checked={selectedGenres.includes(genre)}
                                    onChange={() => handleGenreToggle(genre)}
                                />
                                <span className="text-text-secondary group-hover:text-white transition-colors text-sm">
                                    {genre}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Language */}
                <div className="pb-6 border-b border-[#392828]">
                    <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                        Language
                        <span className="material-symbols-outlined text-text-secondary text-sm"><GrLanguage /></span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {allLanguages.map((language) => (
                            <button
                                key={language}
                                className={`px-3 py-1 rounded text-xs font-medium transition-colors border ${selectedLanguage === language
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-[#291e1e] text-text-secondary hover:text-white border-[#392828] hover:border-text-secondary'
                                    }`}
                                onClick={() => setSelectedLanguage(language)}
                            >
                                {language}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                        Rating
                        <span className="material-symbols-outlined text-text-secondary text-sm"><IoMdStarOutline /></span>
                    </h3>
                    <div className="space-y-2">
                        {ratings.map((rating) => (
                            <label key={rating.value} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    className="border-[#392828] accent-primary bg-input-bg text-primary focus:ring-primary focus:ring-offset-background-dark w-4 h-4"
                                    name="rating"
                                    type="radio"
                                    checked={selectedRating === rating.value}
                                    onChange={() => setSelectedRating(rating.value)}
                                />
                                <div className="flex text-yellow-500 text-sm">
                                    {rating.label.split('').map((char, index) => (
                                        <span key={index} className="material-symbols-outlined text-[16px]">
                                            {char === '★' ? <MdOutlineStarPurple500 /> : <IoMdStarOutline />}
                                        </span>
                                    ))}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                {/* Header with Sort and View Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-surface-dark p-4 rounded-xl border border-[#392828]">
                    <span className="text-text-secondary text-sm font-medium">
                        Showing <strong className="text-white">{indexOfFirstMovie + 1}-{Math.min(indexOfLastMovie, filteredMovies.length)}</strong> of{' '}
                        <strong className="text-white">{filteredMovies.length}</strong> movies
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="text-text-secondary text-sm hidden sm:inline">Sort by:</span>
                        <div className="relative">
                            <select
                                className="appearance-none bg-input-bg text-white text-sm font-medium py-2 pl-4 pr-10 rounded-lg border border-[#392828] focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option>Popularity</option>
                                <option>Release Date</option>
                                <option>Rating (High to Low)</option>
                                <option>Rating (Low to High)</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                                <span className="material-symbols-outlined text-lg"><MdOutlineExpandMore /></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Movie Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="group bg-surface-dark rounded-xl overflow-hidden border border-[#392828] hover:border-primary/50 transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col h-full"
                            onClick={() => router.push(`/movies/${movie.id}`)}
                        >
                            <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
                                <img
                                    alt={movie.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={movie.poster}
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                                    <span className="material-symbols-outlined text-yellow-500 text-sm"><IoMdStarOutline /></span>
                                    <span className="text-white text-xs font-bold">{movie.rating}</span>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-white text-lg font-bold truncate group-hover:text-primary transition-colors">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center justify-between mt-2 mb-4">
                                    <p className="text-text-secondary text-xs font-medium bg-[#392828] px-2 py-0.5 rounded">
                                        {movie.genres.join('/')}
                                    </p>
                                    <span className="text-text-secondary text-xs flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                                        {movie.duration}
                                    </span>
                                </div>
                                <button
                                    onClick={() => router.push(`/movies/${movie.id}`)}
                                    className="mt-auto w-full bg-primary hover:bg-red-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12 gap-2">
                        <button
                            className="size-10 flex items-center justify-center rounded-lg border border-[#392828] text-text-secondary hover:text-white hover:border-primary hover:bg-surface-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <span className="material-symbols-outlined"><FiChevronLeft /></span>
                        </button>

                        {getPageNumbers().map((pageNumber, index) => (
                            pageNumber === '...' ? (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="flex items-center justify-center px-2 text-text-secondary"
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={pageNumber}
                                    className={`size-10 flex items-center justify-center rounded-lg font-bold ${currentPage === pageNumber
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'border border-[#392828] text-text-secondary hover:text-white hover:border-primary hover:bg-surface-dark transition-all'
                                        }`}
                                    onClick={() => setCurrentPage(pageNumber as number)}
                                >
                                    {pageNumber}
                                </button>
                            )
                        ))}

                        <button
                            className="size-10 flex items-center justify-center rounded-lg border border-[#392828] text-text-secondary hover:text-white hover:border-primary hover:bg-surface-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <span className="material-symbols-outlined"><FiChevronRight /></span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoviesPage;