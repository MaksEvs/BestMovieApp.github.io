import React from "react";
import './SelectedMovie.css'

const SelectedMovie = ({ movie }) => {
	console.log(movie)
	return (
		<div className="selected-item">
			<p className="selected-title" >{movie.nameRu}</p>
			<div className="selected-wrapper">
				<img src={movie.posterUrlPreview} alt={movie.nameRu} />
				<div className="selected-descr">
				<p className="selected-text">Жанр: {movie.genres.map((genre) => genre.genre)}</p>
				<p className="selected-text">Оценка: {movie.rating}</p>
				<p className="selected-text">Год выхода: {movie.year}</p>
				</div>
			</div>

		</div>
	);
};

export default SelectedMovie;
