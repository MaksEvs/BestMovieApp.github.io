import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";
import "./SelectedMovie.css";
import Header from "../../../Header/Header";
import LikeButton from "./LikeButton/LikeButton";
import { useGetMovieByIdQuery } from "../../../../store/apiSlice";
import Loader from "../Loader/Loader";

const SelectedMovie = () => {
	const { id } = useParams();
	const { data: selectedMovie, error, isLoading } = useGetMovieByIdQuery(id);
	const { theme } = useTheme();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	if (isLoading)
		return (
			<div>
				<Loader />
			</div>
		);
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className={`selected-items ${theme}`}>
			<Header />
			{selectedMovie && (
				<div
					className={`selected-wrapper ${theme === "dark" ? "dark" : "light"}`}
				>
					<p
						className={`selected-title ${theme === "dark" ? "dark" : "light"}`}
					>
						{selectedMovie.nameRu}
					</p>
					<div className="selected-item">
						<div className="selected-img">
							<img src={selectedMovie.posterUrl} alt={selectedMovie.nameRu} />
						</div>
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
							<LikeButton movieId={selectedMovie.kinopoiskId} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectedMovie;
