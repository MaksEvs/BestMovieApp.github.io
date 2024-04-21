import React, { useState } from 'react';
import './DebouncedInput.css';
import useDebounce from './useDebounce';

const DebouncedInput = ({ handleInputChange, delay }) => {
    const [inputValue, setInputValue] = useState('');
    const [, handleDebounce] = useDebounce(delay);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value.trim() === '') {
            handleInputChange('');
        } else {
            handleDebounce(value, handleInputChange);
        }
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