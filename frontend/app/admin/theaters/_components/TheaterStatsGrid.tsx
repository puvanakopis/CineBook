'use client';

import {
  MdTheaterComedy,
  MdMovie,
  MdOutlineMovie,
  MdAssignment
} from 'react-icons/md';

interface TheaterStatsGridProps {
  total: number;
  withMovies: number;
  withoutMovies: number;
  totalMoviesAssigned: number;
}

export function TheaterStatsGrid({ total, withMovies, withoutMovies, totalMoviesAssigned }: TheaterStatsGridProps) {
  const stats = [
    {
      label: 'Total Theaters',
      value: total.toLocaleString(),
      icon: MdTheaterComedy,
      bgColor: 'bg-blue-500/10 text-blue-600',
    },
    {
      label: 'With Movies',
      value: withMovies.toLocaleString(),
      icon: MdMovie,
      bgColor: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      label: 'Without Movies',
      value: withoutMovies.toLocaleString(),
      icon: MdOutlineMovie,
      bgColor: 'bg-rose-500/10 text-rose-600',
    },
    {
      label: 'Movie Assignments',
      value: totalMoviesAssigned.toLocaleString(),
      icon: MdAssignment,
      bgColor: 'bg-amber-500/10 text-amber-600',
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