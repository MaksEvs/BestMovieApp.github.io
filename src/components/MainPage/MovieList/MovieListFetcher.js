import React, { useState, useEffect, Suspense, lazy } from "react";
import Loader from "./Loader/Loader";
import DebouncedInput from "./InputSearch/DebouncedInput";
import SelectedMovie from "./SelectedMovie/SelectedMovie";
import Pagination from "./Pagination/Pagination";
import FilterButtonsContainer from "./FilterButtons/FilterButtonsContainer";

const MovieListContent = lazy(() => import("./MovieListContent"));

const MovieListFetcher = () => {
	const [movies, setMovies] = useState([]);
	const [allMovies, setAllMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [sortOrder, setSortOrder] = useState("asc");
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
						"X-API-KEY": "60d88c1c-9dd4-447c-a020-cbd9ef01e010",
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

	const handleMovieClick = (movie) => {
		setSelectedMovie(movie);
	};

	const handleInputChange = (value) => {
		setSearchTerm(value);
	};

	const handleFilterChange = (type) => {
		setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
		setFilterType(type);
	};

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

	return (
		<div>
			<h1>Открой для себя мир кино</h1>
			<DebouncedInput handleInputChange={handleInputChange} delay={1000} />
			{isLoading && <Loader />}
			{selectedMovie && (
				<SelectedMovie
					movieId={selectedMovie.filmId}
					selectedMovie={selectedMovie}
					setSelectedMovie={setSelectedMovie}
				/>
			)}

			<FilterButtonsContainer
				handleFilterChange={handleFilterChange}
				filterType={filterType}
				sortOrder={sortOrder}
				allMovies={allMovies}
				setMovies={setMovies}
			/>
			{!isLoading && (
				<Suspense fallback={<Loader />}>
					<MovieListContent
						movies={currentMovies}
						onMovieClick={handleMovieClick}
					/>
					<Pagination
						moviesPerPage={moviesPerPage}
						totalMovies={allMovies.length}
						paginate={paginate}
					/>
				</Suspense>
			)}
		</div>
	);
};

export default MovieListFetcher;
