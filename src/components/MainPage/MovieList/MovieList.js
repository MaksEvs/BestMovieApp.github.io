import React from "react";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import MovieListContent from "./MovieListContent";


const MovieList = ({ movies, onMovieClick }) => {
	return (
		<ErrorBoundary>
			<MovieListContent movies={movies} onMovieClick={onMovieClick} />
		</ErrorBoundary>
	);
};


export default MovieList;
