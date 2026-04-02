'use client';

import { ReportHeader } from './_components/ReportHeader';
import { PerformanceStats } from './_components/PerformanceStats';
import { RevenueByMovie } from './_components/RevenueByMovie';
import { BookingOccupancy } from './_components/BookingOccupancy';
import { ReportFilters } from './_components/ReportFilters';

export default function AdminReports() {
  return (
    <>
      <ReportHeader />
      
      <ReportFilters />

      <PerformanceStats />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <RevenueByMovie />
        <BookingOccupancy />
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-[#392828] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity Log</h3>
          <button className="text-xs font-bold text-primary hover:underline uppercase tracking-tight">View All Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-[#1a1111] text-slate-500 dark:text-[#7d6565] border-b border-gray-100 dark:border-[#392828]">
              <tr>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider">Event</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#392828]">
              {[
                { event: 'Monthly Export Generated', date: 'Oct 12, 10:45 AM', status: 'Completed', details: 'Full Revenue Report' },
                { event: 'Price Tier Modification', date: 'Oct 11, 09:12 PM', status: 'Applied', details: 'Evening Show Price +5%' },
                { event: 'System Backup Success', date: 'Oct 10, 03:00 AM', status: 'Success', details: 'Auto backup at 3 AM' },
                { event: 'New Distributor Report', date: 'Oct 09, 01:22 PM', status: 'Pending', details: 'Spiderman: No Way Home' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#1a1111] transition-colors">
                  <td className="px-4 py-4 font-medium text-slate-900 dark:text-white">{row.event}</td>
                  <td className="px-4 py-4 text-slate-500 dark:text-[#b99d9d]">{row.date}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      row.status === 'Completed' || row.status === 'Success' 
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500'
                        : row.status === 'Applied' 
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500'
                        : 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 dark:text-[#7d6565] text-right font-medium italic">{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
