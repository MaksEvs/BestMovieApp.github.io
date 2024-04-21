import React, { useState } from "react";

const Input = ({ handleInputChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    handleInputChange(value); // Передаем значение введенное пользователем в родительский компонент
  };

  return (

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Поиск по названию фильма или сериала"
      />

  );
};

export default Input;