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
        let filteredMovies = [...allMovies]; // Создаем копию allMovies

        if (type !== 'all') {
            const filterConditions = {
                "year": (a, b) => a.year - b.year,
                "rating": (a, b) => parseFloat(a.rating) - parseFloat(b.rating),
            };

            filteredMovies = filteredMovies.filter(movie => {
                if (type in filterConditions) {
                    return true;
                } else {
                    return movie.type === type;
                }
            });

            filteredMovies.sort((a, b) => {
                if (type in filterConditions) {
                    return sortOrder === "asc" ? filterConditions[type](a, b) : filterConditions[type](b, a);
                } else {
                    return 0;
                }
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