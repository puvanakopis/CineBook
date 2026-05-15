'use client';

import { MdPayments, MdConfirmationNumber, MdMovieFilter, MdPeople } from 'react-icons/md';

interface StatsGridProps {
  stats: {
    totalRevenue: number;
    totalBookings: number;
    totalUsers: number;
    activeMovies: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  const displayStats = [
    {
      label: 'Total Revenue',
      value: `LKR ${stats.totalRevenue.toLocaleString()}`,
      change: '+12%', // Static for now as we don't have historical data yet
      changeType: 'positive',
      icon: MdPayments,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      change: '+5%',
      changeType: 'positive',
      icon: MdConfirmationNumber,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+3%',
      changeType: 'positive',
      icon: MdPeople,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      label: 'Active Movies',
      value: stats.activeMovies.toString(),
      change: '0%',
      changeType: 'neutral',
      icon: MdMovieFilter,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm hover:border-primary/50 transition-colors group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`${stat.iconColor} text-2xl`} />
              </div>
              <span
                className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive'
                    ? 'text-green-500 bg-green-500/10'
                    : 'text-slate-500 dark:text-[#b99d9d] bg-slate-500/10'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-slate-500 dark:text-[#b99d9d] text-sm font-medium">{stat.label}</p>
            <h3 className="text-slate-900 dark:text-white text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        );
      })}
    </div>
  );
}