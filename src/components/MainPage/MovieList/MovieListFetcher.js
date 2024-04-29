import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader/Loader";
import DebouncedInput from "./InputSearch/DebouncedInput";
import SelectedMovie from "./SelectedMovie/SelectedMovie";
import Pagination from "./Pagination/Pagination";
import FilterButtonsContainer from "./FilterButtons/FilterButtonsContainer";
import {
	useGetMoviesByKeywordQuery,
	useGetTopMoviesQuery,
} from "../../../store/apiSlice";
import {
	fetchMoviesStart,
	fetchMoviesSuccess,
	fetchMoviesFailure,
	setFilterType,
	setSortOrder,
} from "../../../store/moviesSlice";

const MovieListContent = lazy(() => import("./MovieListContent"));

const MovieListFetcher = () => {
	const filterType = useSelector((state) => state.movies.filterType);
	const sortOrder = useSelector((state) => state.movies.sortOrder);
	const dispatch = useDispatch();
	const movies = useSelector((state) => state.movies.list);
	const isLoading = useSelector((state) => state.movies.loading);

	const [selectedMovie, setSelectedMovie] = useState(null);
	const [currentPage, setCurrentPage] = useState(
		parseInt(localStorage.getItem("currentPage")) || 1
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [isSearchQuery, setIsSearchQuery] = useState(false);
	const [isInitialLoad, setIsInitialLoad] = useState(true);

	const { data: moviesData, error: moviesError } = useGetMoviesByKeywordQuery(
		{ keyword: searchTerm, page: currentPage },
		{ enabled: isSearchQuery }
	);

	const { data: topMoviesData, error: topMoviesError } = useGetTopMoviesQuery(
		currentPage,
		{ enabled: !isSearchQuery }
	);

	useEffect(() => {
		if (isInitialLoad) {
			setIsInitialLoad(false);
			return;
		}

		dispatch(fetchMoviesStart());
		if (isSearchQuery && moviesData) {
			dispatch(fetchMoviesSuccess(moviesData.films));
		} else if (!isSearchQuery && topMoviesData) {
			dispatch(fetchMoviesSuccess(topMoviesData.films));
		} else if (moviesError || topMoviesError) {
			dispatch(fetchMoviesFailure(moviesError || topMoviesError));
		}
	}, [
		dispatch,
		isSearchQuery,
		moviesData,
		topMoviesData,
		moviesError,
		topMoviesError,
		isInitialLoad,
		currentPage,
	]);

	useEffect(() => {
		localStorage.setItem("currentPage", currentPage);
	}, [currentPage]);

	if (isLoading) {
		return <Loader />;
	}

	if (!topMoviesData) {
		return <div>No movies :</div>;
	}

	const handleMovieClick = (movie) => {
		setSelectedMovie(movie);
	};

	const handleInputChange = (value) => {
		setSearchTerm(value);
		setIsSearchQuery(value !== "");
		setCurrentPage(1);
	};

	const handleFilterChange = (type) => {
		dispatch(setFilterType(type));
		dispatch(
			setSortOrder(
				type !== "all" ? (sortOrder === "asc" ? "desc" : "asc") : "asc"
			)
		);
		// Убираем сброс currentPage при изменении фильтра
		// setCurrentPage(1);
	};

	const isFetching =
		(isSearchQuery && (!moviesData || isLoading)) ||
		(!isSearchQuery && (!topMoviesData || isLoading));

	const hasData = isSearchQuery ? !!moviesData : !!topMoviesData;

	let filteredMovies = [...movies];
	const sortedMovies = filteredMovies.slice().sort((a, b) => {
		if (filterType === "year") {
			return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
		} else if (filterType === "rating") {
			return sortOrder === "asc"
				? parseFloat(a.rating) - parseFloat(b.rating)
				: parseFloat(b.rating) - parseFloat(a.rating);
		} else {
			return 0;
		}
	});

	const currentMovies = isSearchQuery ? moviesData.films : sortedMovies;

	return (
		<div>
			<h2>Открой для себя мир кино</h2>

			<DebouncedInput handleInputChange={handleInputChange} delay={1000} />
			{selectedMovie && (
				<SelectedMovie
					movieId={selectedMovie.filmId}
					selectedMovie={selectedMovie}
					setSelectedMovie={setSelectedMovie}
				/>
			)}
			{!isLoading && (
				<Suspense fallback={<Loader />}>
					<FilterButtonsContainer
						handleFilterChange={handleFilterChange}
						filterType={filterType}
						sortOrder={sortOrder}
						allMovies={filteredMovies}
					/>
					{hasData && (
						<MovieListContent
							movies={currentMovies}
							onMovieClick={handleMovieClick}
						/>
					)}
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPages={topMoviesData.pagesCount}
						isFetching={isFetching}
					/>
				</Suspense>
			)}
		</div>
	);
};

export default MovieListFetcher;
