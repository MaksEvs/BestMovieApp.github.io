import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import SelectedMovie from "./SelectedMovie/SelectedMovie";
import Pagination from "./Pagination/Pagination";

const MovieListFetcher = () => {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage] = useState(10);

	useEffect(() => {
		const fetchPopularMovies = async () => {
			try {
				const response = await fetch(
					`https://kinopoiskapiunofficial.tech/api/v2.1/films/top?type=TOP_100_POPULAR_FILMS&page=${currentPage}`,
					{
						method: "GET",
						headers: {
							"X-API-KEY": "60d88c1c-9dd4-447c-a020-cbd9ef01e010",
							"Content-Type": "application/json",
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch popular movies");
				}
				const data = await response.json();
				const popularMovies = data.films;
				setMovies(popularMovies);
			} catch (error) {
				console.error(error);
			}
		};

		fetchPopularMovies();
	}, [currentPage]);

	const handleMovieClick = (movie) => {
		setSelectedMovie(movie);
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
					<MovieList movies={currentMovies} onMovieClick={handleMovieClick} />
					<Pagination
						moviesPerPage={moviesPerPage}
						totalMovies={movies.length}
						paginate={paginate}
					/>
				</div>
			)}
		</div>
	);
};

export default MovieListFetcher;
