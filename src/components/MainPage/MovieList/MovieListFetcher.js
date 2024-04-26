import React, { useState, useEffect, Suspense } from "react";
import Loader from "./Loader/Loader";
import LazyMovieListContent from "./MovieListContent";
import LazyDebouncedInput from "./InputSearch/DebouncedInput";
import LazySelectedMovie from "./SelectedMovie/SelectedMovie";
import LazyPagination from "./Pagination/Pagination";
import FilterButtonsContainer from "./FilterButtons/FilterButtonsContainer";

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
						"X-API-KEY": "3fc2842c-a40f-463a-806b-531db07f0746",
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
			<Suspense fallback={<Loader />}>
				{selectedMovie ? (
					<LazySelectedMovie
						movieId={selectedMovie.filmId}
						selectedMovie={selectedMovie}
						setSelectedMovie={setSelectedMovie}
					/>
				) : (
					<>
						<h2>Открой для себя мир кино</h2>
						<LazyDebouncedInput
							handleInputChange={handleInputChange}
							delay={500}
						/>
						<FilterButtonsContainer
							handleFilterChange={handleFilterChange}
							filterType={filterType}
							sortOrder={sortOrder}
							allMovies={allMovies}
							setMovies={setMovies}
						/>
						{isLoading ? (
							<Loader />
						) : (
							<>
								<LazyMovieListContent
									movies={currentMovies}
									onMovieClick={handleMovieClick}
								/>
								<LazyPagination
									moviesPerPage={moviesPerPage}
									totalMovies={allMovies.length}
									paginate={paginate}
								/>
							</>
						)}
					</>
				)}
			</Suspense>
		</div>
	);
};

export default MovieListFetcher;
