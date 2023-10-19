import React from 'react';
import usePages from "./usePages.js";

const Pagination = ({totalPages, page, changePage}) => {
    const pagesArray = usePages(totalPages);
    return (
        <div className="d-flex gap-3 align-items-center">
            {pagesArray.map(p => {
                return (
                    <button className={page === p ? "page active_page btn btn-primary" : "page btn btn-danger"}
                            key={p}
                            onClick={() => changePage(p)}
                    >
                        {p}
                    </button>
                )
            })}
        </div>
    );
};

export default Pagination;