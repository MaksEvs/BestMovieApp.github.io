import React from "react";

const FilterButtons = ({ randomMovies, setFilteredMovies }) => {
	
	const handleFilter = (type) => {
		if (!type) {

			setFilteredMovies(randomMovies);
		} else {
	
			const filtered = randomMovies.filter(
				(movie) => movie.Type.toLowerCase() === type.toLowerCase()
			);
			setFilteredMovies(filtered);
		}
	};

	return (
		<div className="filter-buttons">
			<button onClick={() => handleFilter("")}>Все</button>
			<button onClick={() => handleFilter("series")}>Сериалы</button>
			<button onClick={() => handleFilter("movie")}>Фильмы</button>
		</div>
	);
};

export default FilterButtons;