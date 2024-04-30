import React from "react";
import PropTypes from "prop-types";
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

MovieListContent.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            filmId: PropTypes.number,
            posterUrlPreview: PropTypes.string,
            nameRu: PropTypes.string
        })
    ),
    onMovieClick: PropTypes.func
};

export default MovieListContent;
