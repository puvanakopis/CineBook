'use client';

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
        <aside className="space-y-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] p-6 shadow-sm">
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold">
                            Movie filters
                        </p>
                        <p className="text-sm text-slate-400 dark:text-[#b99d9d]">
                            Narrow down the catalog by name, genre, rating and release status.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-3">
                    <label className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
                        Search movies
                    </label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search title or genre"
                        className="w-full rounded-2xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
                        Genre
                    </label>
                    <select
                        value={selectedGenre}
                        onChange={(event) => setSelectedGenre(event.target.value)}
                        className="w-full rounded-2xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                        <option>All Genres</option>
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-3">
                    <label className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
                        Age rating
                    </label>
                    <select
                        value={selectedRating}
                        onChange={(event) => setSelectedRating(event.target.value)}
                        className="w-full rounded-2xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                        <option>All Ratings</option>
                        {ageRatings.map((rating) => (
                            <option key={rating} value={rating}>
                                {rating}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-3">
                    <label className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
                        Release status
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(event) => setSelectedStatus(event.target.value)}
                        className="w-full rounded-2xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                        {releaseStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </aside>
    );
}
