import { useState, useRef, useEffect } from 'react';

const useDebounce = (delay) => {
    const [debouncedInputValue, setDebouncedInputValue] = useState('');
    const timerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const handleDebounce = (value, callback) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (delay === 0) {
            callback(value);
        } else {
            timerRef.current = setTimeout(() => {
                setDebouncedInputValue(value);
                callback(value);
            }, delay);
        }
    };

    return [debouncedInputValue, handleDebounce];
};

export default useDebounce;