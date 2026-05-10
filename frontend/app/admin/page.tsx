'use client';

import { HeroSection } from './_components/HeroSection';
import { StatsGrid } from './_components/StatsGrid';
import { RevenueChart } from './_components/RevenueChart';
import { TopGenres } from './_components/TopGenres';
import { RecentBookings } from './_components/RecentBookings';
import { HallStatus } from './_components/HallStatus';


export default function AdminDashboard() {
    return (
        <>
            <HeroSection />
            <StatsGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart />
                <TopGenres />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <RecentBookings />
                <HallStatus />
            </div>
        </>
    );
}
