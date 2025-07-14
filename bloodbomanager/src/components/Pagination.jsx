import React from 'react';

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.last_page <= 1) return null;

  const { current_page, last_page, links } = pagination;

  const handlePageClick = (page) => {
    if (page !== current_page && page >= 1 && page <= last_page) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label="Pagination Navigation">
      <ul style={{ display: 'flex', listStyle: 'none', gap: 8, padding: 0 }}>
        {/* Previous */}
        <li>
          <button
            onClick={() => handlePageClick(current_page - 1)}
            disabled={current_page === 1}
          >
            &laquo; Prev
          </button>
        </li>

        {/* Page numbers */}
        {links
          .filter(link => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
          .map(link => {
            // link.label puede venir como string, a veces con html entities (como &laquo;)
            // Parseamos la página numérica del label (que debería ser el número)
            const pageNum = parseInt(link.label, 10);
            return (
              <li key={pageNum}>
                <button
                  onClick={() => handlePageClick(pageNum)}
                  disabled={pageNum === current_page}
                  style={{
                    fontWeight: pageNum === current_page ? 'bold' : 'normal',
                    textDecoration: pageNum === current_page ? 'underline' : 'none',
                  }}
                >
                  {pageNum}
                </button>
              </li>
            );
          })}

        {/* Next */}
        <li>
          <button
            onClick={() => handlePageClick(current_page + 1)}
            disabled={current_page === last_page}
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
