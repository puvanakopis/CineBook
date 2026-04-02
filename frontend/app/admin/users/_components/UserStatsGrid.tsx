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
            value: total,
            icon: MdPeopleOutline,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10',
        },
        {
            label: 'Active Customers',
            value: active,
            icon: MdPersonOutline,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/10',
        },
        {
            label: 'Managers',
            value: managers,
            icon: MdPersonAddAlt1,
            color: 'text-amber-400',
            bgColor: 'bg-amber-500/10',
        },
        {
            label: 'Suspended',
            value: suspended,
            icon: MdPersonOff,
            color: 'text-rose-400',
            bgColor: 'bg-rose-500/10',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.label} className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                <Icon className={`${stat.color} text-2xl`} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold">
                                {stat.label}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                    </div>
                );
            })}
        </div>
    );
}
