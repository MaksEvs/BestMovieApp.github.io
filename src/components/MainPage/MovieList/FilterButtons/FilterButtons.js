import React from "react";

const FilterButtons = ({ handleFilterChange }) => {
    const handleClick = (type) => {
        handleFilterChange(type); // Передаем тип фильтрации обратно в родительский компонент
    };

    return (
        <div className="filter-buttons">
            <button onClick={() => handleClick("movie")}>Фильмы</button>
            <button onClick={() => handleClick("tv_series")}>Сериалы</button>
            <button onClick={() => handleClick("all")}>Все</button>
        </div>
    );
};

export default FilterButtons;