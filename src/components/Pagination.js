import React from 'react';

const Pagination = ({ page, setPage, numPages }) => (
    <div className="pagination-buttons">
        <button onClick={() => setPage(0)} disabled={page === 0}>
            First
        </button>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Previous
        </button>
        <button onClick={() => setPage(page + 1)} disabled={page === numPages - 1}>
            Next
        </button>
        <button onClick={() => setPage(numPages - 1)} disabled={page === numPages - 1}>
            Last
        </button>
    </div>
);

export default Pagination;