'use client';

import { MdDownload, MdShare } from 'react-icons/md';

export function ReportHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Reports</h2>
        <p className="text-slate-500 dark:text-[#b99d9d] text-sm mt-1">
          Comprehensive overview of platform performance and revenue metrics.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-[#b99d9d] bg-white dark:bg-[#2b1a1a] border border-gray-200 dark:border-[#392828] rounded-lg hover:bg-slate-50 dark:hover:bg-[#3d2525] transition-colors">
          <MdDownload className="text-lg" />
          Export PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
          <MdShare className="text-lg" />
          Share Report
        </button>
      </div>
    </div>
  );
}
