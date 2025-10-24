'use client';

import { useState } from 'react';
import Image from 'next/image';

type PaginationProps = {
  totalPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage = 1, onPageChange }) => {
  const [page, setPage] = useState(currentPage);

  const handleChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    onPageChange?.(newPage);
  };

  const groupSize = 5;
  const currentGroup = Math.ceil(page / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);
  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex gap-2">
        <button onClick={() => handleChange(1)} disabled={page === 1}>
          <Image src="/icons/double-arrow-left.svg" alt="first" width={24} height={24} />
        </button>
        <button onClick={() => handleChange(page - 1)} disabled={page === 1}>
          <Image src="/icons/arrow-left.svg" alt="prev" width={24} height={24} />
        </button>
      </div>

      <div className="body-6 flex gap-3">
        {visiblePages.map((num) => (
          <button
            key={num}
            onClick={() => handleChange(num)}
            className={`${
              page === num ? 'text-gray-700' : 'text-gray-500 hover:text-gray-700'
            } transition-colors`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={() => handleChange(page + 1)} disabled={page === totalPages}>
          <Image src="/icons/arrow-right.svg" alt="next" width={24} height={24} />
        </button>
        <button onClick={() => handleChange(totalPages)} disabled={page === totalPages}>
          <Image src="/icons/double-arrow-right.svg" alt="last" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
