import React, { useState, useEffect } from 'react';
import './DebouncedInput.css';
import useDebounce from './useDebounce';
import { useTheme } from "../../../../context/ThemeContext";

const DebouncedInput = ({ handleInputChange, delay }) => {
    
    const [inputValue, setInputValue] = useState('');
    const [, handleDebounce] = useDebounce(delay);
    const { theme } = useTheme();
	
	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

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
            className={`input-oval ${theme}`}
        />
    );
};

export default DebouncedInput;