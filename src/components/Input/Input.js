import React from 'react';
import './Input.css'

const Input = () => {

    const onChangeInputHandler = (event) => {
        console.log(event.currentTarget.value)
    }
    return (
       <input type="text" placeholder='Search Movies or TV Shows' onChange={onChangeInputHandler}></input>
    );
};

export default Input;