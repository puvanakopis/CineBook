'use client';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="p-4 border-t border-gray-200 dark:border-[#392828] bg-slate-50/50 dark:bg-[#1a0f0f] flex items-center justify-between">
      <p className="text-xs text-slate-500 dark:text-[#b99d9d]">
        Showing <span className="font-bold text-slate-900 dark:text-white">{startItem}</span> to{' '}
        <span className="font-bold text-slate-900 dark:text-white">{endItem}</span> of{' '}
        <span className="font-bold text-slate-900 dark:text-white">{totalItems}</span> results
      </p>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded border border-gray-200 dark:border-[#392828] text-slate-500 dark:text-[#b99d9d] hover:bg-white dark:hover:bg-[#2b1a1a] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="Previous Page"
        >
          <MdChevronLeft className="text-lg" />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                currentPage === page
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-slate-500 dark:text-[#b99d9d] hover:bg-white dark:hover:bg-[#2b1a1a] border border-transparent hover:border-gray-200 dark:hover:border-[#392828]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded border border-gray-200 dark:border-[#392828] text-slate-500 dark:text-[#b99d9d] hover:bg-white dark:hover:bg-[#2b1a1a] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title="Next Page"
        >
          <MdChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  );
}
