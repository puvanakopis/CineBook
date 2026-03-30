'use client';

import { IoSearchOutline } from "react-icons/io5";

interface BookingFiltersProps {
    activeTab: 'upcoming' | 'past' | 'cancelled';
    setActiveTab: (tab: 'upcoming' | 'past' | 'cancelled') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function BookingFilters({
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery
}: BookingFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Tab Buttons */}
            <div className="bg-[#291e1e]/50 backdrop-blur-sm p-1.5 rounded-xl inline-flex border border-[#392828] shadow-xl">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 ${activeTab === 'upcoming'
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-text-secondary hover:text-white hover:bg-white/5'
                        }`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 ${activeTab === 'past'
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-text-secondary hover:text-white hover:bg-white/5'
                        }`}
                >
                    Past
                </button>
                <button
                    onClick={() => setActiveTab('cancelled')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 ${activeTab === 'cancelled'
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-text-secondary hover:text-white hover:bg-white/5'
                        }`}
                >
                    Cancelled
                </button>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-96">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by movie, theater, or reference..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg bg-[#291e1e]/30 border border-[#392828] text-white p-3 pl-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                    />
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg" />
                </div>
            </div>
        </div>
    );
}