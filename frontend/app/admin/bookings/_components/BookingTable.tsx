'use client';

import { Booking } from '@/interfaces/booking';
import {
  MdMoreVert,
  MdVisibility,
  MdEdit,
  MdDelete,
  MdConfirmationNumber
} from 'react-icons/md';
import { useState } from 'react';

interface BookingTableProps {
  bookings: Booking[];
}

const statusStyles = {
  Confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export function BookingTable({ bookings }: BookingTableProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm overflow-hidden">
      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="bg-slate-50 dark:bg-[#1a0f0f] border-b border-gray-200 dark:border-[#392828]">
            <tr>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Booking ID</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Movie</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Customer</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Date &amp; Time</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Seats</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Price</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#392828]">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-[#1f1212] transition-colors relative group">
                  <td className="p-4">
                    <span className="text-sm font-mono font-medium text-slate-900 dark:text-white">{booking.id}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-7 rounded bg-cover bg-center shrink-0 border border-black/10 dark:border-white/5"
                        style={{ backgroundImage: `url("${booking.poster}")` }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{booking.movieTitle}</span>
                        <span className="text-[11px] text-slate-500 dark:text-[#b99d9d]">{booking.theaterName} • {booking.hallName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{booking.customerName}</span>
                      <span className="text-[11px] text-slate-500 dark:text-[#b99d9d]">{booking.customerEmail}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-slate-600 dark:text-[#b99d9d]">{booking.dateTime}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-[120px]">
                      {booking.seats.map((seat) => (
                        <span key={seat} className="text-[10px] bg-slate-100 dark:bg-[#3d2525] text-slate-600 dark:text-[#f8d7da] px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/5 font-medium">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">${booking.totalPrice.toFixed(2)}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-right relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === booking.id ? null : booking.id)}
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-[#3d2525] text-slate-500 dark:text-[#b99d9d] transition-colors"
                    >
                      <MdMoreVert className="text-xl" />
                    </button>

                    {activeMenu === booking.id && (
                      <div className="absolute right-4 top-12 w-36 bg-surface-light dark:bg-[#2b1a1a] rounded-lg shadow-xl border border-gray-200 dark:border-[#392828] z-50 overflow-hidden py-1">
                        <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 dark:text-[#b99d9d] hover:bg-slate-100 dark:hover:bg-[#3d2525] transition-colors">
                          <MdVisibility className="text-lg text-blue-500" />
                          View Details
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 dark:text-[#b99d9d] hover:bg-slate-100 dark:hover:bg-[#3d2525] transition-colors">
                          <MdEdit className="text-lg text-amber-500" />
                          Edit Status
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                          <MdDelete className="text-lg" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-[#7d6565]">
                    <MdConfirmationNumber className="text-5xl opacity-20" />
                    <p className="font-medium">No bookings found</p>
                    <p className="text-sm">Try adjusting your filters or search query</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-[#392828] bg-slate-50/50 dark:bg-[#1a0f0f] flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-[#b99d9d]">
          Showing <span className="font-bold text-slate-900 dark:text-white">{bookings.length}</span> results
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-[#b99d9d] border border-gray-200 dark:border-[#392828] rounded hover:bg-white dark:hover:bg-[#2b1a1a] transition-all disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 text-xs font-medium text-white bg-primary rounded hover:bg-primary-dark transition-all">
            1
          </button>
          <button className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-[#b99d9d] border border-gray-200 dark:border-[#392828] rounded hover:bg-white dark:hover:bg-[#2b1a1a] transition-all">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
