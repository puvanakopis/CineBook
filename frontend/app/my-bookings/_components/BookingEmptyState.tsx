'use client';

import Link from "next/link";
import { IoTicketOutline } from "react-icons/io5";

export function BookingEmptyState() {
    return (
        <div className="bg-[#1a1414] p-12 rounded-xl border border-[#392828] text-center">

            <IoTicketOutline className="text-5xl text-text-secondary/30 mx-auto mb-4" />

            <h3 className="text-white font-bold text-lg mb-2">
                No bookings found
            </h3>

            <p className="text-text-secondary text-sm mb-6">
                You don’t have any bookings in this category yet.
            </p>

            <Link
                href="/movies"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:bg-red-600 transition-all"
            >
                Browse Movies
            </Link>

        </div>
    );
}