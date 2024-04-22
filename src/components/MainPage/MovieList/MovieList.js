import React from "react";
import "./MovieList.css";

const MovieList = ({ movies, onMovieClick }) => {
	return (
		<ul className="movie-list">
			{movies.map((movie) => (
				<li
					className="movie-item"
					key={movie.filmId}
					onClick={() => onMovieClick(movie)}
				>
					<img src={movie.posterUrlPreview} alt={movie.nameRu} />
					<p className="movie-title">{movie.nameRu}</p>
				</li>
			))}
		</ul>
	);
};

export default MovieList;
