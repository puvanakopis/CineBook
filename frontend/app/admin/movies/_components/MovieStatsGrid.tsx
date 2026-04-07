'use client';

import { 
  MdMovieFilter, 
  MdStar, 
  MdMovie, 
  MdOutlineLocalMovies 
} from 'react-icons/md';

interface MovieStatsGridProps {
  total: number;
  nowShowing: number;
  comingSoon: number;
  archived: number;
}

export function MovieStatsGrid({ total, nowShowing, comingSoon, archived }: MovieStatsGridProps) {
  const stats = [
    {
      label: 'Total Movies',
      value: total.toLocaleString(),
      icon: MdOutlineLocalMovies,
      bgColor: 'bg-cyan-500/10 text-cyan-600',
    },
    {
      label: 'Now Showing',
      value: nowShowing.toLocaleString(),
      icon: MdMovieFilter,
      bgColor: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      label: 'Coming Soon',
      value: comingSoon.toLocaleString(),
      icon: MdStar,
      bgColor: 'bg-amber-500/10 text-amber-600',
    },
    {
      label: 'Archived',
      value: archived.toLocaleString(),
      icon: MdMovie,
      bgColor: 'bg-slate-500/10 text-slate-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className="text-2xl" />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}