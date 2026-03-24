'use client';

import { MdOutlineExpandMore } from "react-icons/md";

interface SortControlsProps {
    filteredMoviesCount: number;
    indexOfFirstMovie: number;
    indexOfLastMovie: number;
    sortBy: string;
    setSortBy: (sort: string) => void;
}

const SortControls = ({
    filteredMoviesCount,
    indexOfFirstMovie,
    indexOfLastMovie,
    sortBy,
    setSortBy,
}: SortControlsProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-surface-dark p-4 rounded-xl border border-[#392828]">
            <span className="text-text-secondary text-sm font-medium">
                Showing <strong className="text-white">{filteredMoviesCount > 0 ? indexOfFirstMovie + 1 : 0}-{Math.min(indexOfLastMovie, filteredMoviesCount)}</strong> of{' '}
                <strong className="text-white">{filteredMoviesCount}</strong> movies
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
    );
};

export default SortControls;