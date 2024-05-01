import React from "react";
import MovieListContent from "./MovieListContent";

const MovieList = ({ movies, onMovieClick }) => {
	return (
			<MovieListContent movies={movies} onMovieClick={onMovieClick} />
	);
};

export default MovieList;
