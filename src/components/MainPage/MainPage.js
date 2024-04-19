import React from "react";
import Header from "../Header/Header";
import "./MainPage.css";
import Input from "./Input/Input";
import FilterMovies from "./FilterMovies/FilterMovies";
import MovieList from "./MovieList/MovieList";
import MovieListHeading from "./MovieList/MovieListHeading/MovieListHeading";

const MainPage = ({ movies, setSearchValue }) => {
	const handleSearchChange = (value) => {
		setSearchValue(value);
	};

	return (
		<div>
			<Header />
			<div className="wrapper">
				<MovieListHeading heading="Откройте для себя мир кино" />
				<Input setSearchValue={handleSearchChange} />
				{/* компонент Input будет отображаться только в том случае, если setSearchValue была передана в компонент MainPage */}

				<FilterMovies />

				<MovieList movies={movies} />
			</div>
		</div>
	);
};

export default MainPage;
