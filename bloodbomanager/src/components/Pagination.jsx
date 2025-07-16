import React from 'react';

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.last_page <= 1) return null;

  const { current_page, last_page } = pagination;

  const handlePageClick = (page) => {
    if (page !== current_page && page >= 1 && page <= last_page) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages = new Set();

    pages.add(1);
    pages.add(last_page);

    if (current_page > 2) pages.add(current_page - 1);
    pages.add(current_page);
    if (current_page < last_page - 1) pages.add(current_page + 1);

    const sortedPages = Array.from(pages).sort((a, b) => a - b);

    const result = [];
    let prev;

    for (let page of sortedPages) {
      if (prev && page - prev > 1) {
        result.push('...');
      }
      result.push(page);
      prev = page;
    }

    return result;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav aria-label="Pagination Navigation" className="flex justify-center my-6">
      <ul className="inline-flex items-center space-x-2 list-none p-0 m-0">
        {/* Prev */}
        <li>
          <button
            onClick={() => handlePageClick(current_page - 1)}
            disabled={current_page === 1}
            className={`px-3 py-1 rounded-md font-medium text-sm transition
              ${current_page === 1
                ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                : 'text-blue-600 hover:bg-blue-100'}
            `}
          >
            &laquo;
          </button>
        </li>

        {/* Pages */}
        {visiblePages.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-gray-500 select-none">…</span>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                disabled={page === current_page}
                className={`px-3 py-1 rounded-md font-medium text-sm transition
                  ${page === current_page
                    ? 'bg-blue-600 text-white cursor-default'
                    : 'text-blue-600 hover:bg-blue-100'}
                `}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            onClick={() => handlePageClick(current_page + 1)}
            disabled={current_page === last_page}
            className={`px-3 py-1 rounded-md font-medium text-sm transition
              ${current_page === last_page
                ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                : 'text-blue-600 hover:bg-blue-100'}
            `}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
