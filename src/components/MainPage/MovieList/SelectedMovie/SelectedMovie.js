import React, { useEffect, useRef } from "react";
import "./SelectedMovie.css";

const SelectedMovie = ({ movieId, selectedMovie }) => {
	const selectedMovieRef = useRef(null);
	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/${movieId}`;

				const response = await fetch(url, {
					method: "GET",
					headers: {
						"X-API-KEY": "5cb2c529-2c32-4ec9-8ff8-a488a598b672",
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch movie");
				}
				const data = await response.json();
				selectedMovieRef.current = data;
			} catch (error) {
				console.error(error);
			}
		};

		fetchMovie();
	}, [movieId]);

	const movie = selectedMovieRef.current;

	return (
		<div className="selected-item">
			{selectedMovie && (
				<>
					<p className="selected-title">{movie.nameRu}</p>
					<div className="selected-wrapper">
						<img src={movie.posterUrlPreview} alt={movie.nameRu} />
						<div className="selected-descr">
							<p className="selected-description">{movie.description}</p>
							<p className="selected-text">
								Жанр: {movie.genres.map((genre) => `${genre.genre} `)}
							</p>
							<p className="selected-text">
								Оценка: {movie.rating || "Рейтинг отсутствует"}
							</p>
							<p className="selected-text">Год выхода: {movie.year}</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SelectedMovie;
