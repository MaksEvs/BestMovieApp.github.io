import React from "react";
import PropTypes from "prop-types";
import FilterButtons from "./FilterButtons";

const FilterButtonsContainer = ({
	handleFilterChange,
	filterType,
	sortOrder,
	allMovies,
	setMovies,
}) => {
	const clickHandle = (type) => {
		const sortedMovies = [...allMovies];
		if (type === "year") {
			sortedMovies.sort((a, b) => {
				return sortOrder === "asc"
					? parseInt(a.year, 10) - parseInt(b.year, 10)
					: parseInt(b.year, 10) - parseInt(a.year, 10);
			});
		} else if (type === "rating") {
			sortedMovies.sort((a, b) => {
				return sortOrder === "asc"
					? parseFloat(a.rating) - parseFloat(b.rating)
					: parseFloat(b.rating) - parseFloat(a.rating);
			});
		}
		setMovies(sortedMovies);
		handleFilterChange(type);
	};

	return (
		<FilterButtons
			handleFilterChange={clickHandle}
			filterType={filterType}
			sortOrder={sortOrder}
		/>
	);
};

FilterButtonsContainer.propTypes = {
	handleFilterChange: PropTypes.func,
	filterType: PropTypes.string,
	sortOrder: PropTypes.string,
	allMovies: PropTypes.array,
	setMovies: PropTypes.func,
};

export default FilterButtonsContainer;
