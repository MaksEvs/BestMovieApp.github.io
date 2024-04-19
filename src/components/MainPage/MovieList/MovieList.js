import React from "react";

const MovieList = ({ movies, onMovieClick }) => {
	return (
		<div className="movie-list">
			<ul>
				{movies.map((movie) => (
					<li key={movie.filmId} onClick={() => onMovieClick(movie)}>
						<img src={movie.posterUrlPreview} alt={movie.nameRu} />
						{/* <p>{movie.nameRu}</p> */}
					</li>
				))}
			</ul>
		</div>
	);
};

export default MovieList;
