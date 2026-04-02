'use client';

import { MdCalendarToday, MdOutlineCategory, MdFilterList } from 'react-icons/md';

export function ReportFilters() {
  const dateRanges = ['Today', 'Last 7 Days', 'Last 30 Days', 'This Year', 'Custom'];
  const categories = ['All Performance', 'Revenue Only', 'Occupancy Only', 'Direct Booking'];

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
      {/* Date Range Selection */}
      <div className="flex-1 flex flex-col sm:flex-row items-stretch gap-4 p-4 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] rounded-xl shadow-sm">
        <div className="flex-1 space-y-2">
          <label className="text-xs font-bold text-slate-500 dark:text-[#7d6565] uppercase flex items-center gap-2">
            <MdCalendarToday className="text-primary" />
            Time Range
          </label>
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((range, idx) => (
              <button 
                key={idx}
                className={`flex-1 min-w-[100px] text-xs font-semibold px-4 py-2.5 rounded-lg border transition-all ${
                  range === 'Last 30 Days'
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                    : 'bg-slate-50 dark:bg-[#1a1111] text-slate-600 dark:text-[#b99d9d] border-gray-100 dark:border-[#392828] hover:border-primary/40'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden sm:block w-px bg-gray-100 dark:bg-[#392828] mx-2 self-stretch" />

        {/* Category Selection */}
        <div className="flex-1 space-y-2">
          <label className="text-xs font-bold text-slate-500 dark:text-[#7d6565] uppercase flex items-center gap-2">
            <MdOutlineCategory className="text-primary" />
            Analytics Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 2).map((cat, idx) => (
              <button 
                key={idx}
                className={`flex-1 text-xs font-semibold px-4 py-2.5 rounded-lg border transition-all ${
                  cat === 'All Performance'
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                    : 'bg-slate-50 dark:bg-[#1a1111] text-slate-600 dark:text-[#b99d9d] border-gray-100 dark:border-[#392828] hover:border-primary/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 bg-slate-100 dark:bg-[#2b1a1a] text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-[#3d2525] transition-colors self-end sm:h-[44px]">
          <MdFilterList className="text-xl" />
          More Filters
        </button>
      </div>
    </div>
  );
}
