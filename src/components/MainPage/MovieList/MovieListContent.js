import React from "react";
import { Link } from "react-router-dom";
import "./MovieList.css";

const MovieListContent = ({ movies, onMovieClick }) => {
	if (!movies || movies.length === 0) {
		return <div className="missing-movie">Нет доступных фильмов.</div>;
	}

	return (
		<ul className="movie-list">
			{movies.map((movie) => (
				<li
					className="movie-item"
					key={movie.filmId}
					onClick={() => onMovieClick(movie)}
				>
					<Link to={`/film/${movie.filmId}`}>
						<img src={movie.posterUrlPreview} alt={movie.nameRu} />
						<p className="movie-title">{movie.nameRu}</p>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default MovieListContent;
