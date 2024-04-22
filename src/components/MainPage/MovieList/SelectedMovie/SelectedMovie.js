import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";
import "./SelectedMovie.css";
import Header from "../../../Header/Header";

const SelectedMovie = () => {
	const { id } = useParams(); // Получаем параметр :id из URL
	const { theme } = useTheme();
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`;

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
				setSelectedMovie(data.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchMovie();
	}, [id]);

	return (
		<div className={`selected-item ${theme}`}>
			<Header />
			{selectedMovie && (
				<>
					<p
						className={`selected-title ${theme === "dark" ? "dark" : "light"}`}
					>
						{selectedMovie.nameRu}
					</p>
					<div className="selected-wrapper">
						<img src={selectedMovie.posterUrl} alt={selectedMovie.nameRu} />
						<div className="selected-descr">
							<p className="selected-description">
								{selectedMovie.description}
							</p>
							<p className="selected-text">
								Жанр:{" "}
								{selectedMovie.genres
									? selectedMovie.genres.map((genre) => `${genre.genre} `)
									: ""}
							</p>
							<p className="selected-text">
								Оценка: {selectedMovie.ratingKinopoisk}
							</p>
							<p className="selected-text">Год выхода: {selectedMovie.year}</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SelectedMovie;
