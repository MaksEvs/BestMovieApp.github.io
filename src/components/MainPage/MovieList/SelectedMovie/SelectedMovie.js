import React from "react";

const SelectedMovie = ({ movie }) => {
	return (
		<div>
			<h2>Выбранный фильм</h2>
			<img src={movie.posterUrlPreview} alt={movie.nameRu} />
			<p>{movie.nameRu}</p>
			<p>Жанры: {movie.genres.map((genre) => genre.genre)}</p>
		</div>
	);
};

export default SelectedMovie;
