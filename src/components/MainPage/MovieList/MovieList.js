import React, { useState, useEffect } from "react";
import "./MovieList.css";

const MovieList = ({ getMovieRequest, movies }) => {
	const [randomMovies, setRandomMovies] = useState([]);

	// Получить случайные фильмы
	const getRandomMovies = async () => {
		try {
			const url = "http://www.omdbapi.com/?s=random&apikey=263d22d8";
			const response = await fetch(url);
			const responseJson = await response.json();

			if (responseJson.Search) {
				setRandomMovies(responseJson.Search);
			}
		} catch (error) {
			console.error("Error fetching random movies:", error);
		}
	};

	useEffect(() => {
		if (!movies || movies.length === 0) {
			// Если основной массив фильмов пуст, получаем случайные фильмы
			getRandomMovies();
			console.log("getRandomMovies executed");
		}
	}, [movies]);

	const moviesToDisplay = movies && movies.length > 0 ? movies : randomMovies;

	return (
		<div className="movie-list">
			{moviesToDisplay.map((movie, index) => (
				<div key={movie.imdbID} className="movie-item">
					<img src={movie.Poster} alt="movie" />
					<p className="movie-title">{movie.Title}</p>
				</div>
			))}
		</div>
	);
};

export default MovieList;
