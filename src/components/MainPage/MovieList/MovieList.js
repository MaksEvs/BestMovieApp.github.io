import React, { useState, useEffect } from "react";
import "./MovieList.css";

const MovieList = (props) => {
	const [randomMovies, setRandomMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);

	// Добавить по настоящему случайные фильмы
	const getRandomMovies = async () => {
		try {
			const url = "http://www.omdbapi.com/?s=random&apikey=263d22d8";
			const response = await fetch(url);
			const responseJson = await response.json();

			if (responseJson.Search) {
				setRandomMovies(responseJson.Search);
				setFilteredMovies(responseJson.Search); // Установка отфильтрованных фильмов по умолчанию
			}
		} catch (error) {
			console.error("Error fetching random movies:", error);
		}
	};

	useEffect(() => {
		getRandomMovies();
	}, []);

	// Функция для фильтрации фильмов по типу
	const handleFilter = (type) => {
		if (!type) {
			// Если тип не указан, показываем все фильмы
			setFilteredMovies(randomMovies);
		} else {
			// Фильтрация по указанному типу
			const filtered = randomMovies.filter(
				(movie) => movie.Type.toLowerCase() === type.toLowerCase()
			);
			setFilteredMovies(filtered);
		}
	};

	return (
		<div className="movie-list">
			<div className="filter-buttons">
				<button onClick={() => handleFilter("")}>Все</button>
				<button onClick={() => handleFilter("series")}>Сериалы</button>
				<button onClick={() => handleFilter("movie")}>Фильмы</button>
			</div>

			<div className="movie-search">
				{filteredMovies.map((movie) => (
					<div key={movie.imdbID} className="movie-item">
						<img src={movie.Poster} alt="movie" />
						<p className="movie-title">{movie.Title}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default MovieList;