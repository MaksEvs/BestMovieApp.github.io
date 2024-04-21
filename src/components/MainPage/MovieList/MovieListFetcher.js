import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import SelectedMovie from "./SelectedMovie/SelectedMovie";
import Pagination from "./Pagination/Pagination";
import Input from './Input/Input';
import FilterButtons from './FilterButtons/FilterButtons';

const MovieListFetcher = () => {
    const [movies, setMovies] = useState([]); // Список отфильтрованных фильмов
    const [allMovies, setAllMovies] = useState([]); // Полный список фильмов
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения значения поля ввода
    const [filterType, setFilterType] = useState("all"); // Тип текущего фильтра
    const [filterBy, setFilterBy] = useState(""); // Тип фильтрации (по дате или рейтингу)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchTerm}&page=${currentPage}`;
                if (searchTerm === "") {
                    url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/top?type=TOP_100_POPULAR_FILMS&page=${currentPage}`;
                }
    
    
                if (filterType === "date") {
                    url += `&year=${filterBy}`;
                } else if (filterType === "rating") {
                    url += `&rating=${filterBy}`;
                }
    
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "X-API-KEY": "60d88c1c-9dd4-447c-a020-cbd9ef01e010",
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }
                const data = await response.json();
                console.log(data)
                const fetchedMovies = data.films;
                setAllMovies(fetchedMovies);
                setMovies(fetchedMovies); 
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchMovies();
    }, [currentPage, searchTerm, filterType, filterBy]);


    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleFilterChange = (type, value) => {
        setFilterType(type); 
        setFilterBy(value); 
    };


    const handleInputChange = (value) => {
        setSearchTerm(value);
    };

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    useEffect(() => {
        let filteredMovies = [...allMovies];
    

        if (filterType === "date" && filterBy) {
            filteredMovies = filteredMovies.filter(movie => new Date(movie.year).getFullYear() === parseInt(filterBy));
        }
 
        if (filterType === "rating" && filterBy) {
            filteredMovies = filteredMovies.filter(movie => movie.rating && movie.rating >= parseInt(filterBy));
        }

        setMovies(filteredMovies);
    }, [filterType, filterBy, allMovies]);
    
    
    return (
        <div>
            {selectedMovie ? (
                <SelectedMovie movieId={selectedMovie.filmId} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
            ) : (
                <div>
                    <Input handleInputChange={handleInputChange} />
                    <FilterButtons  handleFilterChange={handleFilterChange} />
                    
                    {currentMovies.length > 0 ? (
                        <div>
                            <MovieList movies={currentMovies} onMovieClick={handleMovieClick} />
                            <Pagination
                                moviesPerPage={moviesPerPage}
                                totalMovies={allMovies.length}
                                paginate={paginate}
                            />
                        </div>
                    ) : (
                        <div>
                            <p className="subtitle">Данных фильмов нет</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MovieListFetcher;
