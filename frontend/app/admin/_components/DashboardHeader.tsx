'use client';

import { MdSearch, MdNotifications, MdMenu } from 'react-icons/md';
import { FaChevronRight } from "react-icons/fa6";
import { useState } from 'react';

export function DashboardHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="h-16 flex items-center justify-between px-6 bg-surface-light dark:bg-[#120a0a] border-b border-gray-200 dark:border-[#392828] z-10 shrink-0">
            <div className="flex items-center gap-4 md:hidden">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-slate-500 dark:text-white"
                >
                    <MdMenu className="text-2xl" />
                </button>
                <span className="text-lg font-bold dark:text-white">CineManage</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 dark:text-[#b99d9d]">
                <span>Dashboard</span>
                <span className="material-symbols-outlined text-[16px]"><FaChevronRight /></span>
                <span className="text-primary font-medium">Overview</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <input
                        type="text"
                        placeholder="Search bookings, movies..."
                        className="bg-slate-100 dark:bg-[#2b1a1a] text-slate-900 dark:text-white text-sm rounded-full pl-10 pr-4 py-2 w-64 border-none focus:ring-2 focus:ring-primary/50 placeholder-slate-400 dark:placeholder-[#7d6565]"
                    />
                    <MdSearch className="absolute left-3 top-2.5 text-slate-400 dark:text-[#7d6565] text-[20px]" />
                </div>
                <button className="relative p-2 text-slate-500 dark:text-[#b99d9d] hover:text-primary transition-colors">
                    <MdNotifications className="text-2xl" />
                    <span className="absolute top-1.5 right-1.5 size-2 bg-primary rounded-full animate-pulse"></span>
                </button>
            </div>
        </header>
    );
}