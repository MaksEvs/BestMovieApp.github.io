import React, { useState } from 'react';
import './DebouncedInput.css'

const DebouncedInput = ({ handleInputChange, delay }) => {
    const [inputValue, setInputValue] = useState('');

    const timerRef = React.useRef(null);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            handleInputChange(value);
        }, delay);
    };

    return (
        <input 
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search movies..."
        />
    );
};

export default DebouncedInput;