import React, { useEffect } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import "./SelectedMovie.css";

const SelectedMovie = ({ movieId, selectedMovie }) => {
	const { theme } = useTheme();
	// const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/${movieId}`;

				const response = await fetch(url, {
					method: "GET",
					headers: {
						"X-API-KEY": "60d88c1c-9dd4-447c-a020-cbd9ef01e010",
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch movie");
				}
				const data = await response.json();
				selectedMovie = data;
			} catch (error) {
				console.error(error);
			}
		};

		fetchMovie();
	}, [movieId, selectedMovie]);

	return (
		<div className={`selected-item ${theme}`}>
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
								Оценка: {selectedMovie.rating || "Рейтинг отсутствует"}
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
