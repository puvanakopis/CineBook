'use client';

import { MdAdd } from 'react-icons/md';

export function BookingHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Booking Management</h2>
        <p className="text-slate-500 dark:text-[#b99d9d] text-sm mt-1">
          Monitor and manage all customer bookings in real-time.
        </p>
      </div>
    </div>
  );
}
