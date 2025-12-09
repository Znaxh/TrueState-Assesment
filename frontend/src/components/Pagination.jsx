import React from 'react';
import '../components.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const delta = 1;

        if (totalPages <= 1) return [1];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        pages.push(1);

        let start = Math.max(2, currentPage - delta);
        let end = Math.min(totalPages - 1, currentPage + delta);

        if (currentPage <= 3) {
            end = Math.min(totalPages - 1, 4);
        }
        if (currentPage >= totalPages - 2) {
            start = Math.max(2, totalPages - 3);
        }

        if (start > 2) {
            pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) {
            pages.push('...');
        }

        pages.push(totalPages);

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="pagination">
            <button
                className="page-btn"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'default' : 'pointer' }}
            >
                &lt;
            </button>

            {pages.map((page, index) => (
                <button
                    key={`${page}-${index}`}
                    className={`page-btn ${currentPage === page ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
                    onClick={() => typeof page === 'number' ? onPageChange(page) : null}
                    style={{ cursor: page === '...' ? 'default' : 'pointer' }}
                >
                    {page}
                </button>
            ))}

            <button
                className="page-btn"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'default' : 'pointer' }}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
