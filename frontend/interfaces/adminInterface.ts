import { Booking } from './bookingInterface';

export interface DashboardStats {
    stats: {
        totalRevenue: number;
        totalBookings: number;
        totalUsers: number;
        activeMovies: number;
    };
    monthlyRevenue: {
        name: string;
        revenue: number;
    }[];
    topGenres: {
        name: string;
        value: number;
    }[];
    recentBookings: Booking[];
}
