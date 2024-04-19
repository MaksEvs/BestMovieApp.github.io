import React, { useState, useEffect } from "react";
import "./MovieList.css";
import Input from "./Input/Input";
import FilterButtons from "./FilterButtons/FilterButtons";
import MovieSearch from "./MovieSearch/MovieSearch";

const MovieList = (props) => {
	const [randomMovies, setRandomMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);


	const getRandomMovies = async () => {
		try {
			const url = "http://www.omdbapi.com/?s=random&apikey=263d22d8";
			const response = await fetch(url);
			const responseJson = await response.json();

			if (responseJson.Search) {
				setRandomMovies(responseJson.Search);
				setFilteredMovies(responseJson.Search); 
			}
		} catch (error) {
			console.error("Error fetching random movies:", error);
		}
	};

	useEffect(() => {
		getRandomMovies();
	}, []);


	const handleSetFilteredMovies = (movies) => {
		setFilteredMovies(movies);
	};

	return (
		<div className="movie-list">
			<Input setFilteredMovies={handleSetFilteredMovies} />
			<FilterButtons
				randomMovies={randomMovies}
				setFilteredMovies={handleSetFilteredMovies}
			/>
		<MovieSearch filteredMovies={filteredMovies.length ? filteredMovies : randomMovies} />
		</div>
	);
};

export default MovieList;