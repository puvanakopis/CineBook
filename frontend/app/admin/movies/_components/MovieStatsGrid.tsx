'use client';

import { MdMovieFilter, MdStar, MdMovie, MdOutlineLocalMovies } from 'react-icons/md';

interface MovieStatsGridProps {
    total: number;
    nowShowing: number;
    comingSoon: number;
    archived: number;
}

export function MovieStatsGrid({ total, nowShowing, comingSoon, archived }: MovieStatsGridProps) {
    const stats = [
        {
            label: 'Total movies',
            value: total,
            icon: MdOutlineLocalMovies,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10',
        },
        {
            label: 'Now showing',
            value: nowShowing,
            icon: MdMovieFilter,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/10',
        },
        {
            label: 'Coming soon',
            value: comingSoon,
            icon: MdStar,
            color: 'text-amber-400',
            bgColor: 'bg-amber-500/10',
        },
        {
            label: 'Archived',
            value: archived,
            icon: MdMovie,
            color: 'text-slate-300',
            bgColor: 'bg-slate-500/10',
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
