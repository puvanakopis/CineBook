'use client';

import { Booking } from '@/interfaces/bookingInterface';
import Link from 'next/link';

interface RecentBookingsProps {
  bookings: Booking[];
}

const statusStyles = {
  Confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  Completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
};

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <div className="xl:col-span-2 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-[#392828] flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Bookings</h3>
        <Link href="/admin/bookings" className="text-sm text-primary font-medium hover:underline">
          View All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-[#1a0f0f]">
            <tr>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">ID</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Movie</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Date &amp; Time</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Seats</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#392828]">
            {bookings.length > 0 ? (
              bookings.map((booking) => {
                const seatsString = booking.seats.map(s => `${s.row}${s.number}`).join(', ');
                const formattedDate = new Date(booking.dateTime).toLocaleString('default', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                });

                return (
                  <tr key={booking._id} className="hover:bg-slate-50 dark:hover:bg-[#1f1212] transition-colors">
                    <td className="p-4 text-sm text-slate-900 dark:text-white font-mono">#{booking._id.split('_')[1] || booking._id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="h-10 w-7 rounded bg-cover bg-center bg-[#1a0f0f]" 
                          style={{ backgroundImage: booking.poster ? `url("${booking.poster}")` : 'none' }}
                        />
                        <span className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{booking.movieTitle}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-500 dark:text-[#b99d9d] whitespace-nowrap">{formattedDate}</td>
                    <td className="p-4 text-sm text-slate-500 dark:text-[#b99d9d] max-w-[150px] truncate">{seatsString}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[booking.status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center text-slate-500">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}