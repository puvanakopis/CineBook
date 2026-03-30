'use client';

import Link from "next/link";

export function BookingEmptyState() {
    return (
        <div className="text-center py-20 bg-[#291e1e]/30 rounded-xl border border-[#392828]/50">
            <div className="flex justify-center mb-4">
                <span className="material-symbols-outlined text-6xl text-text-secondary">confirmation_number</span>
            </div>
            <p className="text-text-secondary text-lg mb-2">No bookings found</p>
            <p className="text-text-secondary/70 text-sm mb-6">You do not have any bookings matching your criteria.</p>
            <Link
                href="/movies"
                className="inline-block bg-primary hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
            >
                Browse Movies
            </Link>
        </div>
    );
}