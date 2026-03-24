'use client';

import Image from "next/image";
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
    movie_id: number;
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
    theaters: Theater[];
    cast: CastMember[];
    reviews: Review[];
}

interface Theater {
    theater_id: string;
    name: string;
    address: string;
    features: {
        mTicket: boolean;
        foodBeverage: boolean;
        parking: boolean;
        wheelchair: boolean;
    };
    showtimes: {
        standard?: ShowTime[];
        imax3d?: ShowTime[];
    };
}

interface ShowTime {
    time: string;
    price: number;
    currency: string;
    isSoldOut: boolean;
}

interface CastMember {
    cast_id: string;
    name: string;
    role: string;
    type: string;
    imageUrl: string;
}

interface Review {
    review_id: string;
    user_id: string;
    author: string;
    date: string;
    rating: number;
    content: string;
    initials: string;
    hasPremium: boolean;
    likes: number;
    verified: boolean;
}

const MoviesPage = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
    const [selectedRating, setSelectedRating] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('Popularity');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies as Movie[]);
    const moviesPerPage = 9;

    const router = useRouter();

    const allGenres = Array.from(
        new Set(movies.flatMap(movie => movie.genres))
    ).sort();

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

    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

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

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                endPage = 4;
            }

            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            if (startPage > 2) {
                pageNumbers.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }

            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 py-10 gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                {/* Show Date */}
                <div className="pb-6 border-b border-[#392828]">
                    <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                        Show Date
                        <MdCalendarMonth className="text-text-secondary text-sm" />
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
                        <MdOutlineMovieCreation className="text-text-secondary text-sm" />
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
                        <GrLanguage className="text-text-secondary text-sm" />
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
                        <IoMdStarOutline className="text-text-secondary text-sm" />
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
                                        <span key={index}>
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
                        Showing <strong className="text-white">{filteredMovies.length > 0 ? indexOfFirstMovie + 1 : 0}-{Math.min(indexOfLastMovie, filteredMovies.length)}</strong> of{' '}
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
                                <MdOutlineExpandMore className="text-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Movie Grid */}
                {currentMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentMovies.map((movie) => (
                            <div
                                key={movie.movie_id}
                                className="group bg-surface-dark rounded-xl overflow-hidden border border-[#392828] hover:border-primary/50 transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col h-full cursor-pointer"
                                onClick={() => router.push(`/movies/${movie.movie_id}`)}
                            >
                                <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
                                    <Image
                                        src={movie.poster}
                                        alt={movie.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                                        <IoMdStarOutline className="text-yellow-500 text-sm" />
                                        <span className="text-white text-xs font-bold">{movie.rating}</span>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="text-white text-lg font-bold truncate group-hover:text-primary transition-colors">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center justify-between mt-2 mb-4">
                                        <p className="text-text-secondary text-xs font-medium bg-[#392828] px-2 py-0.5 rounded">
                                            {movie.genres.join(' • ')}
                                        </p>
                                        <span className="text-text-secondary text-xs flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                                            {movie.duration}
                                        </span>
                                    </div>
                                    <div className="mb-3 text-xs text-text-secondary">
                                        <span className="block truncate">{movie.languages}</span>
                                        <span className="block mt-1">{movie.formats}</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/movies/${movie.movie_id}`);
                                        }}
                                        className="mt-auto w-full bg-primary hover:bg-red-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-text-secondary text-lg">No movies found matching your criteria.</p>
                        <button
                            onClick={() => {
                                setSelectedGenres([]);
                                setSelectedLanguage('All');
                                setSelectedRating('');
                            }}
                            className="mt-4 bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && currentMovies.length > 0 && (
                    <div className="flex justify-center mt-12 gap-2">
                        <button
                            className="size-10 flex items-center justify-center rounded-lg border border-[#392828] text-text-secondary hover:text-white hover:border-primary hover:bg-surface-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <FiChevronLeft />
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
                            <FiChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoviesPage;