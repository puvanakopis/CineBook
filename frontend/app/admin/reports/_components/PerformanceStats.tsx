'use client';

import { MdTrendingUp, MdEventSeat, MdAttachMoney, MdShowChart } from 'react-icons/md';

const stats = [
  {
    label: 'Total Revenue',
    value: '$48,250.00',
    change: '+15.8%',
    changeType: 'positive',
    icon: MdAttachMoney,
    bgColor: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    label: 'Avg. Occupancy',
    value: '68.4%',
    change: '+4.2%',
    changeType: 'positive',
    icon: MdEventSeat,
    bgColor: 'bg-blue-500/10 text-blue-600',
  },
  {
    label: 'Conversion Rate',
    value: '12.5%',
    change: '+1.1%',
    changeType: 'positive',
    icon: MdTrendingUp,
    bgColor: 'bg-purple-500/10 text-purple-600',
  },
  {
    label: 'Avg. Ticket Price',
    value: '$14.20',
    change: '-0.5%',
    changeType: 'negative',
    icon: MdShowChart,
    bgColor: 'bg-orange-500/10 text-orange-600',
  },
];

export function PerformanceStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.changeType === 'positive';
        return (
          <div
            key={index}
            className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className="text-2xl" />
              </div>
              <span
                className={`ml-auto text-xs font-semibold px-2 py-1 rounded-full ${
                  isPositive ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
                }`}
              >
                {stat.change}
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
          </div>
        );
      })}
    </div>
  );
}