'use client';

const movieData = [
  { title: 'The Eras Tour', revenue: 12500, color: '#ec1313' },
  { title: 'Dune: Part Two', revenue: 9800, color: '#8b5cf6' },
  { title: 'Oppenheimer', revenue: 7200, color: '#3b82f6' },
  { title: 'Spiderman: No Way Home', revenue: 5400, color: '#10b981' },
  { title: 'Inception', revenue: 4100, color: '#f59e0b' },
];

export function RevenueByMovie() {
  const maxRevenue = Math.max(...movieData.map(d => d.revenue));

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue by Movie</h3>
        <p className="text-sm text-slate-500 dark:text-[#b99d9d]">Top performing movies this month</p>
      </div>

      <div className="flex-1 space-y-5">
        {movieData.map((movie, index) => {
          const percentage = (movie.revenue / maxRevenue) * 100;
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700 dark:text-white truncate max-w-[200px]">
                  {movie.title}
                </span>
                <span className="text-slate-900 dark:text-primary font-bold">
                  ${movie.revenue.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-[#1a1111] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: movie.color,
                    boxShadow: `0 0 10px ${movie.color}33`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-[#392828] flex items-center justify-between">
        <div className="text-xs text-slate-500 dark:text-[#b99d9d] uppercase font-bold tracking-widest">
          Total Market Share
        </div>
        <div className="text-lg font-black text-primary italic">
          +24%
        </div>
      </div>
    </div>
  );
}
