import React, { useState, useEffect } from "react";
import './MovieList.css';

const MovieList = (props) => {
    const [randomMovies, setRandomMovies] = useState([]);

    // Фильмы, которые отображаются на странице, пока запрос не был введён
    // На данный момент не работает, а есть просто random фильмы
    const getRandomMovies = async () => {
        try {
            const url = 'http://www.omdbapi.com/?s=random&apikey=263d22d8';
            const response = await fetch(url);
            const responseJson = await response.json();

            if (responseJson.Search) {
                setRandomMovies(responseJson.Search);
            }
        } catch (error) {
            console.error('Error fetching random movies:', error);
        }
    };

    useEffect(() => {
        if (!props.movies || props.movies.length === 0) {
            // Если основной массив фильмов пуст, получаем случайные фильмы
            getRandomMovies();
            console.log('getRandomMovies executed');
        }
    }, [props.movies]);

    const moviesToDisplay = props.movies && props.movies.length > 0 ? props.movies : randomMovies;

    return (
        <div className="movie-list">
            {moviesToDisplay.map((movie, index) => (
                <div key={movie.imdbID} className="movie-item">
                    <img src={movie.Poster} alt='movie' />
                </div>
            ))}
        </div>
    );
};

export default MovieList;