'use client';

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = 4;
      }

      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      if (startPage > 2) {
        pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12 gap-2">
      <button
        className="size-10 flex items-center justify-center rounded-lg border border-[#392828] text-text-secondary hover:text-white hover:border-primary hover:bg-surface-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FiChevronLeft />
      </button>

      {getPageNumbers().map((pageNumber, index) => (
        pageNumber === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="flex items-center justify-center px-2 text-text-secondary"
          >
            ...
          </span>
        ) : (
          <button
            key={pageNumber}
            className={`size-10 flex items-center justify-center rounded-lg font-bold ${
              currentPage === pageNumber
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'border border-[#392828] text-text-secondary hover:text-white hover:border-primary hover:bg-surface-dark transition-all'
            }`}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </button>
        )
      ))}

      <button
        className="size-10 flex items-center justify-center rounded-lg border border-[#392828] text-text-secondary hover:text-white hover:border-primary hover:bg-surface-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;