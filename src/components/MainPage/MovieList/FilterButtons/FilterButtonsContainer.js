import React from "react";
import PropTypes from "prop-types";
import FilterButtons from "./FilterButtons";

const FilterButtonsContainer = ({
    handleFilterChange,
    filterType,
    sortOrder,
    allMovies,
}) => {

    const handleFilterButtonClick = (type) => {
        let filteredMovies = [...allMovies];

        if (type !== 'all') {
            filteredMovies = filteredMovies.filter(movie => {
                return movie.type === type;
            });
        }

        handleFilterChange(type, filteredMovies);
    };

    return (
        <FilterButtons
            handleFilterChange={handleFilterButtonClick}
            filterType={filterType}
            sortOrder={sortOrder}
        />
    );
};

FilterButtonsContainer.propTypes = {
    handleFilterChange: PropTypes.func.isRequired,
    filterType: PropTypes.string,
    sortOrder: PropTypes.string,
    allMovies: PropTypes.array,
};

export default FilterButtonsContainer;