'use client';

import { RiArrowDropDownLine } from 'react-icons/ri';

interface TheaterFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  cities: string[];
}

export function TheaterFilters({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  cities,
}: TheaterFiltersProps) {
  return (
    <aside className="h-fit space-y-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] p-6 shadow-sm">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Theater filters</h3>
        <p className="text-sm text-slate-400 dark:text-[#b99d9d]">
          Search by theater name, address, city, or narrow by city.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
            Search theaters
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search theater"
            className="w-full rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
            City
          </label>
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 pr-10 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option>All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
              <RiArrowDropDownLine size={27} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}