import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  // Limit the number of page buttons displayed
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = startPage + maxPageButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          className="page-button"
          onClick={() => onPageChange(currentPage - 1)}
        >
          &laquo; Prev
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          className={`page-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          className="page-button"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
