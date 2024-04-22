import React, { useEffect, useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import "./SelectedMovie.css";

const SelectedMovie = ({ movieId }) => {
    const { theme } = useTheme();
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`;

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
                console.log(data)
                setSelectedMovie(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovie();
    }, [movieId]);

    console.log(selectedMovie)

    return (
        <div className={`selected-item ${theme}`}>
            {selectedMovie && (
                <>
                    <p className={`selected-title ${theme === "dark" ? "dark" : "light"}`}>
                        {selectedMovie.nameRu}
                    </p>
                    <div className="selected-wrapper">
                        <img
                            src={selectedMovie.posterUrl}
                            alt={selectedMovie.nameRu}
                        />
                        <div className="selected-descr">
                            <p className="selected-description">
                                {selectedMovie.description}
                            </p>
                            <p className="selected-text">
                                Жанр: {selectedMovie.genres ? selectedMovie.genres.map((genre) => `${genre.genre} `) : ""}
                            </p>
                            <p className="selected-text">
                                Оценка: {selectedMovie.ratingKinopoisk}
                            </p>
                            <p className="selected-text">Год выхода: {selectedMovie.year}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SelectedMovie;