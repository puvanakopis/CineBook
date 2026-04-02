'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    MdTheaters,
    MdDashboard,
    MdMovie,
    MdCalendarMonth,
    MdConfirmationNumber,
    MdEventSeat,
    MdBarChart,
    MdManageAccounts,
    MdLogout
} from 'react-icons/md';

const navItems = [
    { name: 'Dashboard', path: '/admin', icon: MdDashboard, active: true },
    { name: 'Movies', path: '/admin/movies', icon: MdMovie, badge: null },
    { name: 'Bookings', path: '/admin/bookings', icon: MdConfirmationNumber, badge: '12' },
    { name: 'Reports', path: '/admin/reports', icon: MdBarChart, badge: null },
];

const settingsItems = [
    { name: 'Users', path: '/admin/users', icon: MdManageAccounts },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen bg-surface-light dark:bg-[#120a0a] border-r border-gray-200 dark:border-[#392828] shrink-0">
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                        <MdTheaters className="text-[28px]" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none tracking-tight">
                            CineManage
                        </h1>
                        <p className="text-slate-500 dark:text-[#b99d9d] text-xs font-medium mt-1">
                            Admin Console
                        </p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 flex flex-col gap-2 px-4 py-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-600 dark:text-[#b99d9d] hover:bg-slate-100 dark:hover:bg-[#2b1a1a] hover:text-primary'
                                }`}
                        >
                            <Icon className={`text-xl ${isActive ? 'fill-current' : 'group-hover:text-primary transition-colors'}`} />
                            <p className="text-sm font-medium flex-1">{item.name}</p>
                            {item.badge && (
                                <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#392828]">
                    <p className="px-3 text-xs font-semibold text-slate-400 dark:text-[#7d6565] uppercase tracking-wider mb-2">
                        Settings
                    </p>
                    {settingsItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 dark:text-[#b99d9d] hover:bg-slate-100 dark:hover:bg-[#2b1a1a] hover:text-primary transition-colors group"
                            >
                                <Icon className="text-xl group-hover:text-primary transition-colors" />
                                <p className="text-sm font-medium">{item.name}</p>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-[#392828]">
                <div className="flex items-center gap-3">
                    <div
                        className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/30"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAs5DcQo6oAPjQRBDKB8zVlS0mPwOh00kjw5Lk6hZisN3Rt42G9RTolcAkD6uhPBfDlLivxtkA7UuL9BuD_LJ-UVsw7wxfhuzFhl3dw7un8CFTpkCTV15N7QbeG3jwMzTHkeGzW1BiqZsoBuLichS494FYfTSazvQg1ktbfAsPAhA0g_FFOieILTWLMsrJAh3h0fwOnuzuOxHJzFWhbns7jrby1yf5fBk-N_gm7x3GIdu9N4IXXn7yBy_QY94aSZbP6Q-pgFPPofOMv")' }}
                    />
                    <div className="flex flex-col">
                        <p className="text-slate-900 dark:text-white text-sm font-medium">Admin User</p>
                        <p className="text-slate-500 dark:text-[#b99d9d] text-xs">Manager</p>
                    </div>
                    <button className="ml-auto text-slate-400 hover:text-white transition-colors">
                        <MdLogout className="text-xl" />
                    </button>
                </div>
            </div>
        </aside>
    );
}