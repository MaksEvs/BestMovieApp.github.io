import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import './DebouncedInput.css';
import useDebounce from './useDebounce';
import { useTheme } from "../../../../context/ThemeContext";

const DebouncedInput = ({ handleInputChange, searchTerm, delay }) => {
    
    const [inputValue, setInputValue] = useState(searchTerm); 
    const [, handleDebounce] = useDebounce(delay);
    const { theme } = useTheme();
	
	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value.trim() === '' && value.length !== 0 ) {
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

DebouncedInput.propTypes = {
    handleInputChange: PropTypes.func,
    searchTerm: PropTypes.string,
    delay: PropTypes.number
}


export default DebouncedInput;
