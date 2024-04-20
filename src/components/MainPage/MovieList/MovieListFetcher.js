import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import SelectedMovie from "./SelectedMovie/SelectedMovie";
import Pagination from "./Pagination/Pagination";
import Input from "./Input/Input";
import FilterButtons from "./FilterButtons/FilterButtons";

const MovieListFetcher = () => {
	const [movies, setMovies] = useState([]); // Список отфильтрованных фильмов
	const [allMovies, setAllMovies] = useState([]); // Полный список фильмов
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения значения поля ввода

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				let url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchTerm}&page=${currentPage}`;
				if (searchTerm === "") {
					url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/top?type=TOP_100_POPULAR_FILMS&page=${currentPage}`;
				}
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"X-API-KEY": "5cb2c529-2c32-4ec9-8ff8-a488a598b672",
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch movies");
				}
				const data = await response.json();
				const fetchedMovies = data.films;
				setAllMovies(fetchedMovies); // Сохраняем полный список фильмов
				setMovies(fetchedMovies); // Отображаем все фильмы при загрузке страницы
			} catch (error) {
				console.error(error);
			}
		};

		fetchMovies();
	}, [currentPage, searchTerm]);

	const handleMovieClick = (movie) => {
		setSelectedMovie(movie);
	};

	const handleInputChange = (value) => {
		setSearchTerm(value); // Обновляем состояние searchTerm при изменении значения поля ввода
	};

	const handleFilterChange = (type) => {
		let filteredMovies = [];
		if (type === "movie") {
			// Фильтрация только по фильмам
			filteredMovies = allMovies.filter((movie) => movie.type === "FILM");
		} else if (type === "tv_series") {
			// Фильтрация только по сериалам
			filteredMovies = allMovies.filter((movie) => movie.type === "TV_SERIES");
		} else if (type === "all") {
			// Показываем все фильмы
			filteredMovies = allMovies;
		}
		setMovies(filteredMovies);
	};

	// Определяем индексы для текущей страницы
	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

	// Функция для изменения текущей страницы
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div>
			{selectedMovie ? (
				<SelectedMovie movie={selectedMovie} />
			) : (
				<div>
					<Input handleInputChange={handleInputChange} />
					<FilterButtons handleFilterChange={handleFilterChange} />
					<MovieList movies={currentMovies} onMovieClick={handleMovieClick} />
					<Pagination
						moviesPerPage={moviesPerPage}
						totalMovies={allMovies.length}
						paginate={paginate}
					/>
				</div>
			)}
		</div>
	);
};

export default MovieListFetcher;
