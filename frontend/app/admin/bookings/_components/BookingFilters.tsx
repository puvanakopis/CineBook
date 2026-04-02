'use client';

import { MdSearch, MdFilterList, MdClear } from 'react-icons/md';

interface BookingFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  statuses: string[];
}

export function BookingFilters({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  statuses,
}: BookingFiltersProps) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm flex flex-col gap-6">
      <div className="flex items-center gap-2 text-slate-900 dark:text-white pb-4 border-b border-gray-200 dark:border-[#392828]">
        <MdFilterList className="text-xl text-primary" />
        <h3 className="font-bold">Filters</h3>
      </div>

      <div className="flex flex-col gap-5">
        {/* Search */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">
            Search Bookings
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID, customer, movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1a0f0f] border border-gray-200 dark:border-[#392828] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white outline-none transition-all"
            />
            <MdSearch className="absolute left-3 top-3 text-slate-400 dark:text-[#7d6565] text-xl" />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">
            Booking Status
          </label>
          <div className="flex flex-wrap gap-2">
            {['All Statuses', ...statuses].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedStatus === status
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                    : 'bg-slate-100 dark:bg-[#2b1a1a] text-slate-600 dark:text-[#b99d9d] hover:bg-slate-200 dark:hover:bg-[#3d2525]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(searchQuery || selectedStatus !== 'All Statuses') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('All Statuses');
            }}
            className="flex items-center justify-center gap-2 text-sm text-red-500 font-medium hover:text-red-600 py-2 border border-red-500/20 rounded-lg hover:bg-red-500/5 transition-all mt-2"
          >
            <MdClear />
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
}
