'use client';

import { IoSearchOutline } from "react-icons/io5";

interface BookingFiltersProps {
    activeTab: 'confirmed' | 'completed' | 'cancelled';
    setActiveTab: (tab: 'confirmed' | 'completed' | 'cancelled') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function BookingFilters({
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery
}: BookingFiltersProps) {

    const Tab = (key: typeof activeTab, label: string) => (
        <button
            onClick={() => setActiveTab(key)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition ${
                activeTab === key
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-white'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="flex flex-col md:flex-row justify-between gap-6">

            <div className="bg-[#1a1414] p-2 rounded-xl border border-[#392828] flex gap-2">
                {Tab('confirmed', 'Confirmed')}
                {Tab('completed', 'Completed')}
                {Tab('cancelled', 'Cancelled')}
            </div>

            <div className="relative w-full md:w-96">

                <IoSearchOutline className="absolute left-3 top-3 text-text-secondary" />

                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bookings..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1a1414] border border-[#392828] text-white focus:outline-none focus:border-primary"
                />

            </div>

        </div>
    );
}