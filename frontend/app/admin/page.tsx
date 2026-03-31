'use client';

import { DashboardHeader } from './_components/DashboardHeader';
import { HeroSection } from './_components/HeroSection';
import { StatsGrid } from './_components/StatsGrid';
import { RevenueChart } from './_components/RevenueChart';
import { TopGenres } from './_components/TopGenres';
import { RecentBookings } from './_components/RecentBookings';
import { HallStatus } from './_components/HallStatus';

export default function Dashboard() {
    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <DashboardHeader />
                <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-10">
                        <HeroSection />
                        <StatsGrid />

                        {/* Charts & Trends */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <RevenueChart />
                            <TopGenres />
                        </div>

                        {/* Recent Bookings & Hall Status */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <RecentBookings />
                            <HallStatus />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}