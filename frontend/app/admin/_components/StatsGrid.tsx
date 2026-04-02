'use client';

import { MdPayments, MdConfirmationNumber, MdMovieFilter, MdEventSeat } from 'react-icons/md';

const stats = [
  {
    label: 'Total Revenue',
    value: '$12,450',
    change: '+12%',
    changeType: 'positive',
    icon: MdPayments,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    label: 'Tickets Sold Today',
    value: '842',
    change: '+5%',
    changeType: 'positive',
    icon: MdConfirmationNumber,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Active Movies',
    value: '14',
    change: '0%',
    changeType: 'neutral',
    icon: MdMovieFilter,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    label: 'Occupancy Rate',
    value: '76%',
    change: '+2.4%',
    changeType: 'positive',
    icon: MdEventSeat,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
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