import React from "react";

const FilterButtons = ({ handleFilterChange }) => {
    const handleClick = (type) => {
        handleFilterChange(type);
    };

    return (
        <div className="filter-buttons">
            <button onClick={() => handleClick("year")}>По году</button>
            <button onClick={() => handleClick("rating")}>По рейтингу</button>
            <button onClick={() => handleClick("all")}>Все</button>
        </div>
    );
};

export default FilterButtons;