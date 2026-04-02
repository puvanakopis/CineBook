'use client';

import { 
  MdConfirmationNumber, 
  MdAttachMoney, 
  MdPendingActions, 
  MdCancel 
} from 'react-icons/md';

interface BookingStatsGridProps {
  total: number;
  revenue: number;
  pending: number;
  cancelled: number;
}

export function BookingStatsGrid({ total, revenue, pending, cancelled }: BookingStatsGridProps) {
  const stats = [
    {
      label: 'Total Bookings',
      value: total.toLocaleString(),
      icon: MdConfirmationNumber,
      color: 'blue',
      bgColor: 'bg-blue-500/10 text-blue-600',
    },
    {
      label: 'Total Revenue',
      value: `$${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: MdAttachMoney,
      color: 'green',
      bgColor: 'bg-green-500/10 text-green-600',
    },
    {
      label: 'Pending',
      value: pending.toLocaleString(),
      icon: MdPendingActions,
      color: 'amber',
      bgColor: 'bg-amber-500/10 text-amber-600',
    },
    {
      label: 'Cancelled',
      value: cancelled.toLocaleString(),
      icon: MdCancel,
      color: 'red',
      bgColor: 'bg-red-500/10 text-red-600',
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
