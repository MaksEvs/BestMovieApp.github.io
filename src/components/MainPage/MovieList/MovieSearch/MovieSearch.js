import React from "react";

const MovieSearch = ({ filteredMovies }) => {
    return (
        <ul className="movie-search">
            {filteredMovies.map((movie) => (
                <li key={movie.imdbID} className="movie-item">
                    <img src={movie.Poster} alt="movie" />
                    <p className="movie-title">{movie.Title}</p>
                </li>
            ))}
        </ul>
    );
};

export default MovieSearch;
