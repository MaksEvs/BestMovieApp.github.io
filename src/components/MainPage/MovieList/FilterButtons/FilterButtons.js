import React from "react";
import PropTypes from "prop-types";
import "./FilterButtons.css";

const FilterButtons = ({ handleFilterChange, filterType, sortOrder }) => {
	const handleClick = (type) => {
		handleFilterChange(type);
	};

	return (
		<div className="filter-buttons">
			<button onClick={() => handleClick("year")}>
				По году
				{filterType === "year" && sortOrder === "asc" ? (
					<span>&#8593;</span>
				) : null}
				{filterType === "year" && sortOrder === "desc" ? (
					<span>&#8595;</span>
				) : null}
			</button>

			<button onClick={() => handleClick("rating")}>
				По рейтингу
				{filterType === "rating" && sortOrder === "asc" ? (
					<span>&#8593;</span>
				) : null}
				{filterType === "rating" && sortOrder === "desc" ? (
					<span>&#8595;</span>
				) : null}
			</button>

			<button onClick={() => handleClick("all")}>Все</button>
		</div>
	);
};

FilterButtons.propTypes = {
	handleFilterChange: PropTypes.func,
	filterType: PropTypes.string,
	sortOrder: PropTypes.string
}


export default FilterButtons;
