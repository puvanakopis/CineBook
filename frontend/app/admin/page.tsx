'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from './_components/HeroSection';
import { StatsGrid } from './_components/StatsGrid';
import { RevenueChart } from './_components/RevenueChart';
import { TopGenres } from './_components/TopGenres';
import { RecentBookings } from './_components/RecentBookings';
import { HallStatus } from './_components/HallStatus';
import { adminApi } from '@/services/adminApi';
import { DashboardStats } from '@/interfaces/adminInterface';

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const stats = await adminApi.getDashboardStats();
                setData(stats);
            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 dark:text-[#b99d9d] animate-pulse">Loading Analytics...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
                <div className="p-4 bg-red-500/10 rounded-full">
                    <span className="text-4xl">⚠️</span>
                </div>
                <h2 className="text-xl font-bold text-white">Something went wrong</h2>
                <p className="text-slate-500 dark:text-[#b99d9d]">Could not load dashboard data. Please try again later.</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <HeroSection />
            <StatsGrid stats={data.stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart data={data.monthlyRevenue} />
                <TopGenres data={data.topGenres} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <RecentBookings bookings={data.recentBookings} />
                <HallStatus />
            </div>
        </div>
    );
}
