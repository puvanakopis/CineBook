'use client';

import { RiArrowDropDownLine } from "react-icons/ri";

interface MovieFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  selectedRating: string;
  setSelectedRating: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  genres: string[];
  ageRatings: string[];
  releaseStatuses: string[];
}

export function MovieFilters({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  selectedRating,
  setSelectedRating,
  selectedStatus,
  setSelectedStatus,
  genres,
  ageRatings,
  releaseStatuses,
}: MovieFiltersProps) {
  return (
    <aside className="h-fit space-y-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] p-6 shadow-sm">

      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Movie filters
        </h3>
        <p className="text-sm text-slate-400 dark:text-[#b99d9d]">
          Narrow down the catalog by name, genre, rating and release status.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">

        {/* Search */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
            Search movies
          </label>

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search title or genre"
            className="w-full rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Genre */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
            Genre
          </label>

          <div className="relative">
            <select
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 pr-10 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option>All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {/* Custom dropdown icon */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
              <RiArrowDropDownLine size={27} />
            </div>
          </div>
        </div>

        {/* Age Rating */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
            Age rating
          </label>

          <div className="relative">
            <select
              value={selectedRating}
              onChange={(event) => setSelectedRating(event.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 pr-10 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option>All Ratings</option>
              {ageRatings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
              <RiArrowDropDownLine size={27} />
            </div>
          </div>
        </div>

        {/* Release Status */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
            Release status
          </label>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 pr-10 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {releaseStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
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