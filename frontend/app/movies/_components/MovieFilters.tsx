'use client';

import { MdCalendarMonth } from "react-icons/md";
import { MdOutlineMovieCreation } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdSearch } from "react-icons/md";

interface MovieFiltersProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedGenres: string[];
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
    selectedRating: string;
    setSelectedRating: (rating: string) => void;
    allGenres: string[];
    allLanguages: string[];
    ratings: Array<{ value: string; label: string }>;
    handleGenreToggle: (genre: string) => void;
    handleClearFilters: () => void;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
}

const MovieFilters = ({
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
    searchQuery,
    setSearchQuery,
}: MovieFiltersProps) => {
    return (
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            {/* Search */}
            <div className="pb-6 border-b border-[#392828]">
                <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                    Search
                    <MdSearch className="text-text-secondary text-sm" />
                </h3>
                <div className="pt-2">
                    <input
                        type="text"
                        placeholder="Search movies, genres, synopsis..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-input-bg border border-[#392828] rounded px-3 py-2 text-sm text-text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>
            </div>
            {/* Show Date */}
            <div className="pb-6 border-b border-[#392828]">
                <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                    Show Date
                    <MdCalendarMonth className="text-text-secondary text-sm" />
                </h3>
                <div className="space-y-2">
                    {['Today', 'Tomorrow', 'This Weekend'].map((label) => {
                        const computeDateValue = (lbl: string) => {
                            const d = new Date();
                            if (lbl === 'Today') return d.toISOString().split('T')[0];
                            if (lbl === 'Tomorrow') { d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; }
                            const today = new Date();
                            const day = today.getDay();
                            const daysUntilSat = (6 - day + 7) % 7;
                            const sat = new Date();
                            sat.setDate(today.getDate() + (daysUntilSat === 0 ? 0 : daysUntilSat));
                            return sat.toISOString().split('T')[0];
                        };

                        const dateVal = computeDateValue(label);

                        return (
                            <label key={label} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="rounded accent-primary border-[#392828] bg-input-bg text-primary focus:ring-primary focus:ring-offset-background-dark w-4 h-4"
                                    type="checkbox"
                                    checked={selectedDate === dateVal}
                                    onChange={(e) => setSelectedDate(e.target.checked ? dateVal : '')}
                                />
                                <span className="text-text-secondary group-hover:text-white transition-colors text-sm">
                                    {label}
                                </span>
                            </label>
                        );
                    })}
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

            {/* Clear filters button */}
            {(searchQuery || selectedGenres.length > 0 || selectedLanguage !== 'All' || selectedRating || selectedDate) && (
                <button
                    onClick={handleClearFilters}
                    className="w-full py-2 text-center text-sm text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                    Clear all filters
                </button>
            )}
        </aside>
    );
};

export default MovieFilters;