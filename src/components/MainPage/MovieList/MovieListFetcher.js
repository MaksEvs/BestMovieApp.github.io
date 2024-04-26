import React, { Suspense, useState, useEffect } from "react";
import Loader from "./Loader/Loader";
import DebouncedInput from "./InputSearch/DebouncedInput";
import FilterButtons from "./FilterButtons/FilterButtons";
import Pagination from "./Pagination/Pagination";

const SelectedMovie = React.lazy(() => import("./SelectedMovie/SelectedMovie"));
const MovieListContent = React.lazy(() => import("./MovieListContent"));

const MovieListFetcher = () => {
	const [movies, setMovies] = useState([]);
	const [allMovies, setAllMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [isLoading, setIsLoading] = useState(true);
	const [sortOrder, setSortOrder] = useState("asc");

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
			} catch (error) {
				console.error(error);
			} finally {
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
			<h2>Открой для себя мир кино</h2>
			<DebouncedInput handleInputChange={handleInputChange} delay={500} />
			<FilterButtons
				handleFilterChange={handleFilterChange}
				filterType={filterType}
				sortOrder={sortOrder}
			/>
			<Suspense fallback={<Loader />}>
				{!isLoading && selectedMovie && (
					<SelectedMovie
						movieId={selectedMovie.filmId}
						selectedMovie={selectedMovie}
						setSelectedMovie={setSelectedMovie}
					/>
				)}
				{!isLoading && (
					<MovieListContent
						movies={currentMovies}
						onMovieClick={handleMovieClick}
					/>
				)}
				{!isLoading && (
					<Pagination
						moviesPerPage={moviesPerPage}
						totalMovies={allMovies.length}
						paginate={paginate}
					/>
				)}
			</Suspense>
			{isLoading && <Loader />}
		</div>
	);
};

export default MovieListFetcher;
