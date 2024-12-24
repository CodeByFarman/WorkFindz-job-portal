import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't render pagination if there are no pages to display
  if (totalPages <= 1) return null;

  return (
    <div className="paginations">
      <ul className="pager">
        <li>
          <button
            className="pager-prev"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              className={`pager-number ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            className="pager-next"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
