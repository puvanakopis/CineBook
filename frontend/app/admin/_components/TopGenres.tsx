'use client';

interface TopGenresProps {
  data: {
    name: string;
    value: number;
  }[];
}

export function TopGenres({ data }: TopGenresProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  const colors = [
    'bg-primary',
    'bg-primary/80',
    'bg-primary/60',
    'bg-primary/40',
    'bg-primary/20'
  ];

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Genres</h3>
      <div className="flex-1 flex flex-col justify-center gap-6">
        {data.length > 0 ? (
          data.map((genre, index) => {
            const percentage = Math.round((genre.value / maxValue) * 100);
            return (
              <div key={genre.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-300">{genre.name}</span>
                  <span className="text-sm font-bold text-white">{genre.value} bookings</span>
                </div>
                <div className="w-full bg-[#120a0a] rounded-full h-2">
                  <div 
                    className={`${colors[index % colors.length]} h-2 rounded-full transition-all duration-1000`} 
                    style={{ width: `${percentage}%` }} 
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-slate-500 py-10">No data available</div>
        )}
      </div>
    </div>
  );
}