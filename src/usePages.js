import {useMemo} from 'react';
import {getPagesArray} from "./pages.js";

const usePages = (totalPages) => {
    return useMemo(() => {
        return getPagesArray(totalPages);
    }, [totalPages]);
};

export default usePages;