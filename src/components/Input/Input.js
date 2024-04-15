import React, { useState } from 'react';
import './Input.css';

const Input = ({ setSearchValue }) => {
    const onChangeInputHandler = (event) => {
        setSearchValue(event.currentTarget.value);
    };

    return (
        <input
            type="text"
            placeholder='Search Movies or TV Shows'
            onChange={onChangeInputHandler}
        ></input>
    );
};

export default Input;