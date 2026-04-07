'use client';

import { MdPeopleOutline, MdPersonOutline, MdPersonAddAlt1, MdPersonOff } from 'react-icons/md';

interface UserStatsGridProps {
  total: number;
  active: number;
  managers: number;
  suspended: number;
}

export function UserStatsGrid({ total, active, managers, suspended }: UserStatsGridProps) {
  const stats = [
    {
      label: 'Total Users',
      value: total.toLocaleString(),
      icon: MdPeopleOutline,
      bgColor: 'bg-cyan-500/10 text-cyan-600',
    },
    {
      label: 'Active Customers',
      value: active.toLocaleString(),
      icon: MdPersonOutline,
      bgColor: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      label: 'Managers',
      value: managers.toLocaleString(),
      icon: MdPersonAddAlt1,
      bgColor: 'bg-amber-500/10 text-amber-600',
    },
    {
      label: 'Suspended',
      value: suspended.toLocaleString(),
      icon: MdPersonOff,
      bgColor: 'bg-rose-500/10 text-rose-600',
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