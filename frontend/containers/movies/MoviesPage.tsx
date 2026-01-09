'use client';

import { useState, useEffect } from 'react';
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlineMovieCreation } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

interface Movie {
    id: number;
    title: string;
    genre: string;
    rating: number;
    duration: string;
    poster: string;
}

const MoviesPage = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>(['Action']);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
    const [selectedRating, setSelectedRating] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('Popularity');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const moviesPerPage = 9;

    const movies: Movie[] = [
        {
            id: 1,
            title: "Coolie",
            genre: "Action/Thriller",
            duration: "2h 45m",
            rating: 8.8,
            poster: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg",
        },
        {
            id: 2,
            title: "Good Bad Ugly",
            genre: "Biography/Action",
            duration: "2h 32m",
            rating: 8.5,
            poster: "https://www.wallsnapy.com/img_gallery/top-good-bad-ugly-first-look-poster-hd-4k-download-4272458.jpg",
        },
        {
            id: 3,
            title: "The GOAT",
            genre: "Sci-Fi/Action",
            duration: "2h 59m",
            rating: 7.9,
            poster: "https://www.wallsnapy.com/img_gallery/new-goat-poster-4k-4123382.jpg",
        },
        {
            id: 4,
            title: "Madharasi",
            genre: "Action/Drama",
            duration: "2h 22m",
            rating: 8.5,
            poster: "https://www.wallsnapy.com/img_gallery/madharasi-movie-first-look-poster-4k-3608222.jpg",
        },
        {
            id: 5,
            title: "Vidaamuyarchi",
            genre: "Action/Thriller",
            duration: "2h 38m",
            rating: 8.2,
            poster: "https://www.wallsnapy.com/img_gallery/vidamuyarchi-ajith-first-look-poster-4k-wallpaper-7913453.jpg",
        },
        {
            id: 6,
            title: "Retro",
            genre: "Drama/Action",
            duration: "2h 43m",
            rating: 7.8,
            poster: "https://www.wallsnapy.com/img_gallery/new-retro-surya-4k-images-5102165.jpg",
        },
        {
            id: 7,
            title: "Captain Miller",
            genre: "Sports/Drama",
            duration: "2h 28m",
            rating: 8.3,
            poster: "https://www.wallsnapy.com/img_gallery/top-captain-miller-dhanush-hd-poster-wallpaper-1080px-7975672.jpg",
        },
        {
            id: 8,
            title: "Thug Life",
            genre: "Fantasy/Action",
            duration: "2h 34m",
            rating: 7.5,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        },
        {
            id: 9,
            title: "Kalki",
            genre: "Sci-Fi/Action",
            duration: "2h 45m",
            rating: 8.7,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        },
        {
            id: 10,
            title: "Pushpa 2",
            genre: "Action/Drama",
            duration: "2h 50m",
            rating: 8.4,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        },
        {
            id: 11,
            title: "Salaar 2",
            genre: "Action/Thriller",
            duration: "2h 55m",
            rating: 8.6,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        },
        {
            id: 12,
            title: "Vikram 2",
            genre: "Action/Thriller",
            duration: "2h 40m",
            rating: 8.9,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        },
        {
            id: 13,
            title: "Leo 2",
            genre: "Action/Drama",
            duration: "2h 48m",
            rating: 8.3,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        },
        {
            id: 14,
            title: "Jailer 2",
            genre: "Action/Comedy",
            duration: "2h 35m",
            rating: 8.1,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        },
        {
            id: 15,
            title: "Beast 2",
            genre: "Action/Thriller",
            duration: "2h 30m",
            rating: 7.9,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        },
        {
            id: 16,
            title: "Master 2",
            genre: "Action/Drama",
            duration: "2h 50m",
            rating: 8.2,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        },
        {
            id: 17,
            title: "Darbar 2",
            genre: "Action/Crime",
            duration: "2h 42m",
            rating: 7.8,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        },
        {
            id: 18,
            title: "Annathe 2",
            genre: "Action/Family",
            duration: "2h 38m",
            rating: 7.6,
            poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        }
    ];

    const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
    const languages = ['English', 'Spanish', 'Hindi', 'French'];
    const ratings = [
        { value: '5', label: '★★★★★' },
        { value: '4', label: '★★★★☆' },
        { value: '3', label: '★★★☆☆' },
        { value: '2', label: '★★☆☆☆' },
        { value: '1', label: '★☆☆☆☆' },
    ];

    // Calculate total pages
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    // Get current movies to display
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

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

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedGenres, selectedLanguage, selectedRating, sortBy]);

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
                        {genres.map((genre) => (
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
                        {languages.map((language) => (
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
                        Showing <strong className="text-white">{indexOfFirstMovie + 1}-{Math.min(indexOfLastMovie, movies.length)}</strong> of{' '}
                        <strong className="text-white">{movies.length}</strong> movies
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
                        >
                            <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
                                <img
                                    alt={movie.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={movie.poster}
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
                                        {movie.genre}
                                    </p>
                                    <span className="text-text-secondary text-xs flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                                        {movie.duration}
                                    </span>
                                </div>
                                <button className="mt-auto w-full bg-primary hover:bg-red-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
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