import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loader from "../../MainPage/MovieList/Loader/Loader";
import "./MovieList.css";

const MovieListContent = ({ movies, onMovieClick, isLoading }) => {

	return (
		<div>
			{isLoading ? (
                    <Loader />
                ) : !movies? (
                    <p className="missing-movie">Нет доступных фильмов</p>
                ) :	<ul className="movie-list">
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
			</ul>}
		</div>
		
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
    onMovieClick: PropTypes.func,
	isLoading: PropTypes.bool
};

export default MovieListContent;
