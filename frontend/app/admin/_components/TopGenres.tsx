'use client';

const genres = [
  { name: 'Action', percentage: 65, color: 'bg-primary' },
  { name: 'Sci-Fi', percentage: 45, color: 'bg-primary/70' },
  { name: 'Comedy', percentage: 30, color: 'bg-primary/50' },
  { name: 'Horror', percentage: 20, color: 'bg-primary/30' },
];

export function TopGenres() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Genres</h3>
      <div className="flex-1 flex flex-col justify-center gap-6">
        {genres.map((genre) => (
          <div key={genre.name}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">{genre.name}</span>
              <span className="text-sm font-bold text-white">{genre.percentage}%</span>
            </div>
            <div className="w-full bg-[#120a0a] rounded-full h-2">
              <div className={`${genre.color} h-2 rounded-full`} style={{ width: `${genre.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}