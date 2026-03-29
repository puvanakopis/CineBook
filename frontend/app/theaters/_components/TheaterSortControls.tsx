'use client';

import { MdOutlineExpandMore } from "react-icons/md";
import { MdGridView } from "react-icons/md";
import { HiOutlineViewList } from "react-icons/hi";

interface TheaterSortControlsProps {
    filteredTheatersCount: number;
    indexOfFirstTheater: number;
    indexOfLastTheater: number;
    sortBy: string;
    setSortBy: (sort: string) => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
}

const TheaterSortControls = ({
    filteredTheatersCount,
    indexOfFirstTheater,
    indexOfLastTheater,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
}: TheaterSortControlsProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-surface-dark p-4 rounded-xl border border-[#392828]">
            <span className="text-text-secondary text-sm font-medium">
                Showing <strong className="text-white">{filteredTheatersCount > 0 ? indexOfFirstTheater + 1 : 0}-{Math.min(indexOfLastTheater, filteredTheatersCount)}</strong> of{' '}
                <strong className="text-white">{filteredTheatersCount}</strong> theaters
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
                        <option>Name (A-Z)</option>
                        <option>Name (Z-A)</option>
                        <option>Rating (High to Low)</option>
                        <option>Rating (Low to High)</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                        <MdOutlineExpandMore className="text-lg" />
                    </div>
                </div>
                <div className="flex bg-input-bg rounded-lg p-1 border border-[#392828]">
                    <button
                        className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            <MdGridView />
                        </span>
                    </button>
                    <button
                        className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
                        onClick={() => setViewMode('list')}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            <HiOutlineViewList />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TheaterSortControls;