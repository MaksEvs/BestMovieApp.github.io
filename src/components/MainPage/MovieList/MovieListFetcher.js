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
  const moviesPerPage = 10;
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );

  const {
    data: moviesData,
    error: moviesError,
    isLoading: isFetching,
  } = useGetMoviesByKeywordQuery(
    { keyword: searchTerm, page: currentPage },
    { enabled: searchTerm !== "" }
  );
  
  const {
    data: topMoviesData,
    error: topMoviesError,
  } = useGetTopMoviesQuery(currentPage, {
    enabled: searchTerm === "",
  });

  useEffect(() => {
    try {
      dispatch(fetchMoviesStart());
      if (searchTerm === "") {
        if (topMoviesData) {
          dispatch(fetchMoviesSuccess(topMoviesData.films));
        }
        if (topMoviesError) {
          dispatch(fetchMoviesFailure(topMoviesError));
        }
      } else {
        if (moviesData) {
          dispatch(fetchMoviesSuccess(moviesData.films));
        } else if (moviesError) {
          dispatch(fetchMoviesFailure(moviesError));
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      dispatch(fetchMoviesFailure(error));
    }
  }, [
    dispatch,
    searchTerm,
    currentPage,
    moviesData,
    moviesError,
    topMoviesData,
    topMoviesError,
    selectedMovie,
  ]);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (type) => {
    dispatch(setFilterType(type));
    dispatch(
      setSortOrder(
        type !== "all" ? (sortOrder === "asc" ? "desc" : "asc") : "asc"
      )
    );
    setCurrentPage(1);
  };

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

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
  };

  return (
	<div>
	  <h2>Открой для себя мир кино</h2>
  
	  <DebouncedInput
		handleInputChange={handleInputChange}
		delay={1000}
		searchTerm={searchTerm}
	  />
	  {selectedMovie && (
		<SelectedMovie
		  movieId={selectedMovie.filmId}
		  selectedMovie={selectedMovie}
		  setSelectedMovie={setSelectedMovie}
		/>
	  )}
	  <Suspense fallback={<Loader />}>
		{(isLoading) && <Loader />}
		{filteredMovies.length === 0 ? (
		  <h2>Нет доступных фильмов</h2>
		) : (
		  <>
			<FilterButtonsContainer
			  handleFilterChange={handleFilterChange}
			  filterType={filterType}
			  sortOrder={sortOrder}
			  allMovies={filteredMovies}
			/>
			<MovieListContent
			  movies={currentMovies}
			  onMovieClick={handleMovieClick}
			  isLoading={isFetching}
			/>
			<Pagination
			  moviesPerPage={moviesPerPage}
			  totalMovies={filteredMovies.length}
			  paginate={paginate}
			  currentPage={currentPage}
			/>
		  </>
		)}
	  </Suspense>
	</div>
  );
};

export default MovieListFetcher;