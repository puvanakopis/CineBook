'use client';

import { MdTrendingUp, MdEventSeat, MdAttachMoney, MdShowChart } from 'react-icons/md';

const stats = [
  {
    label: 'Total Revenue',
    value: '$48,250.00',
    change: '+15.8%',
    changeType: 'positive',
    icon: MdAttachMoney,
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Avg. Occupancy',
    value: '68.4%',
    change: '+4.2%',
    changeType: 'positive',
    icon: MdEventSeat,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Conversion Rate',
    value: '12.5%',
    change: '+1.1%',
    changeType: 'positive',
    icon: MdTrendingUp,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    label: 'Avg. Ticket Price',
    value: '$14.20',
    change: '-0.5%',
    changeType: 'negative',
    icon: MdShowChart,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

export function PerformanceStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm hover:border-primary/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`${stat.iconColor} text-2xl`} />
              </div>
              <span
                className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
                  stat.changeType === 'positive'
                    ? 'text-emerald-500 bg-emerald-500/10'
                    : 'text-rose-500 bg-rose-500/10'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-slate-500 dark:text-[#b99d9d] text-sm font-medium">{stat.label}</p>
            <h3 className="text-slate-900 dark:text-white text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
          </div>
        );
      })}
    </div>
  );
}
