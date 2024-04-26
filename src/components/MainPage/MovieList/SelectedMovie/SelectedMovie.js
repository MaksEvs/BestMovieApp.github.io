import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";
import "./SelectedMovie.css";
import Header from "../../../Header/Header";

const SelectedMovie = () => {
	const { id } = useParams();
	const [selectedMovie, setSelectedMovie] = useState(null);
	const { theme } = useTheme();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`;

				const response = await fetch(url, {
					method: "GET",
					headers: {
						"X-API-KEY": "be9f6d65-d4ac-468a-bb70-97ac247c7cfe",
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch movie");
				}
				const data = await response.json();
				setSelectedMovie(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchMovie();
	}, [id]);

	return (
		<div className={`selected-items ${theme}`}>
			<Header />
			{selectedMovie && (
				<div className={`wrapper ${theme === "dark" ? "dark" : "light"}`}>
					<p
						className={`selected-title ${theme === "dark" ? "dark" : "light"}`}
					>
						{selectedMovie.nameRu}
					</p>
					<div className="selected-item">
						<img src={selectedMovie.posterUrl} alt={selectedMovie.nameRu} />
						<div className="selected-descr">
							<p
								className={`selected-description ${
									theme === "dark" ? "dark" : "light"
								}`}
							>
								{selectedMovie.description}
							</p>
							<br></br>
							<p
								className={`selected-text ${
									theme === "dark" ? "dark" : "light"
								}`}
							>
								Жанр:{" "}
								{selectedMovie.genres
									? selectedMovie.genres.map((genre) => `${genre.genre} `)
									: ""}
							</p>
							<p
								className={`selected-text ${
									theme === "dark" ? "dark" : "light"
								}`}
							>
								Оценка: {selectedMovie.ratingKinopoisk}
							</p>
							<p
								className={`selected-text ${
									theme === "dark" ? "dark" : "light"
								}`}
							>
								Год выхода: {selectedMovie.year}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectedMovie;
