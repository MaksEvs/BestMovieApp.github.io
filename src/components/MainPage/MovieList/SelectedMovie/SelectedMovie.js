import React, { useEffect } from "react";
import './SelectedMovie.css'

const SelectedMovie = ({ movieId, selectedMovie }) => {
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/${movieId}`;
    
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
                selectedMovie = data;
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchMovie();
    }, [movieId, selectedMovie]);

    return (
        <div className="selected-item">
            {selectedMovie && (
                <>
                    <p className="selected-title">{selectedMovie.nameRu}</p>
                    <div className="selected-wrapper">
                        <img src={selectedMovie.posterUrlPreview} alt={selectedMovie.nameRu} />
                        <div className="selected-descr">
                            <p className="selected-description">{selectedMovie.description}</p>
                            <p className="selected-text">Жанр: {selectedMovie.genres.map((genre) => `${genre.genre} `)}</p>
                            <p className="selected-text">Оценка: {selectedMovie.rating || "Рейтинг отсутствует"}</p>
                            <p className="selected-text">Год выхода: {selectedMovie.year}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SelectedMovie;
