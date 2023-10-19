import React, {useState} from 'react';

const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetching = async (...args) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch(e) {
            if (typeof e === "string") {
                setError(e.toUpperCase());
            } else if (e instanceof Error) {
                setError(e?.response?.data?.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
};

export default useFetching;