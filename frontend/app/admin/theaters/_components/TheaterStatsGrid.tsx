'use client';

interface TheaterStatsGridProps {
  total: number;
  withMovies: number;
  withoutMovies: number;
  totalMoviesAssigned: number;
}

const stats = [
  { label: 'Total Theaters', key: 'total' },
  { label: 'With Movies', key: 'withMovies' },
  { label: 'Without Movies', key: 'withoutMovies' },
  { label: 'Movie Assignments', key: 'totalMoviesAssigned' },
] as const;

export function TheaterStatsGrid({ total, withMovies, withoutMovies, totalMoviesAssigned }: TheaterStatsGridProps) {
  const values = { total, withMovies, withoutMovies, totalMoviesAssigned };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.key}
          className="rounded-xl border border-gray-200 dark:border-[#392828] bg-surface-light dark:bg-surface-dark p-5 shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-[#8f7676] font-semibold">
            {stat.label}
          </p>
          <h3 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            {values[stat.key]}
          </h3>
        </div>
      ))}
    </div>
  );
}