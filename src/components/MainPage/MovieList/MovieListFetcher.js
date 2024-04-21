import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import SelectedMovie from "./SelectedMovie/SelectedMovie";
import Pagination from "./Pagination/Pagination";
import FilterButtons from "./FilterButtons/FilterButtons";
import DebouncedInput from "./Input//DebouncedInput";
import Loader from "./Loader/Loader";

const MovieListFetcher = () => {
	const [movies, setMovies] = useState([]);
	const [allMovies, setAllMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchMovies = async () => {
			setIsLoading(true);
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
				setAllMovies(fetchedMovies);
				setMovies(fetchedMovies);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		};

		fetchMovies();
	}, [currentPage, searchTerm]);

	useEffect(() => {
		let filteredMovies = [];
		if (filterType === "movie") {
			filteredMovies = allMovies.filter((movie) => movie.type === "FILM");
		} else if (filterType === "tv_series") {
			filteredMovies = allMovies.filter((movie) => movie.type === "TV_SERIES");
		} else {
			filteredMovies = allMovies;
		}
		setMovies(filteredMovies);
	}, [filterType, allMovies]);

	const handleMovieClick = (movie) => {
		setSelectedMovie(movie);
	};

	const handleInputChange = (value) => {
		setSearchTerm(value);
	};

	const handleFilterChange = (type) => {
		setFilterType(type);
	};

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

	return (
		<div>
			{selectedMovie ? (
				<SelectedMovie
					movieId={selectedMovie.filmId}
					selectedMovie={selectedMovie}
					setSelectedMovie={setSelectedMovie}
				/>
			) : (
				<>
					<DebouncedInput handleInputChange={handleInputChange} delay={500} />
					<FilterButtons handleFilterChange={handleFilterChange} />
					{isLoading ? (
						<Loader />
					) : (
						<>
							<MovieList
								movies={currentMovies}
								onMovieClick={handleMovieClick}
							/>
							<Pagination
								moviesPerPage={moviesPerPage}
								totalMovies={allMovies.length}
								paginate={paginate}
							/>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default MovieListFetcher;
