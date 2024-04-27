import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import './DebouncedInput.css';
import useDebounce from './useDebounce';
import { useTheme } from "../../../../context/ThemeContext";

const DebouncedInput = ({ handleInputChange, delay}) => {
    
    const [inputValue, setInputValue] = useState('');
    const [, handleDebounce] = useDebounce(delay);
    const { theme } = useTheme();
	
	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

    const handleChange = (event) => {
        const value = event.target.value;
        console.log(value)
        if (value.trim() === '' && value.length !== 0 ) {
            setInputValue('');
            handleInputChange('');
            
            
        } else {
            setInputValue(value); 
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
    delay: PropTypes.number
}


export default DebouncedInput;