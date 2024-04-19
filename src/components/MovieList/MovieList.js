import React, { useState, useEffect } from "react";
import './MovieList.css';

const MovieList = (props) => {
    const [randomMovies, setRandomMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

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
        getRandomMovies();
    }, []);

    useEffect(() => {
        setFilteredMovies(randomMovies);
    }, [randomMovies]);

    useEffect(() => {
        if (props.movies && props.movies.length > 0) {
            setFilteredMovies(props.movies);
        }
    }, [props.movies]);

    const handleFilter = (type) => {
        if (!type) {
            setFilteredMovies(randomMovies);
        } else {
            const filtered = randomMovies.filter(movie => movie.Type.toLowerCase() === type.toLowerCase());
            setFilteredMovies(filtered);
        }
    };

    return (
        <div className="movie-list">
            <div className="filter-buttons">
                <button onClick={() => handleFilter('movie')}>Фильмы</button>
                <button onClick={() => handleFilter('series')}>Сериалы</button>
                <button onClick={() => handleFilter('')}>Все</button>
            </div>

            <div className="movie-search">
            {filteredMovies.map((movie, index) => (
                <div key={movie.imdbID} className="movie-item">
                    <img src={movie.Poster} alt='movie' />
                    <p className="movie-title">{movie.Title}</p>
                </div>
            ))}
            </div>

        </div>
    );
};

export default MovieList;