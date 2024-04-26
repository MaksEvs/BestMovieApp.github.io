import React, { useState, useEffect, Suspense} from "react";
import Loader from "./Loader/Loader";

const LazyMovieListContent = React.lazy(() => import("./MovieListContent"));
const LazyDebouncedInput = React.lazy(() => import("./Input/DebouncedInput"));
const LazyFilterButtons = React.lazy(() => import("./FilterButtons/FilterButtons"));
const LazySelectedMovie = React.lazy(() => import("./SelectedMovie/SelectedMovie"));
const LazyPagination = React.lazy(() => import("./Pagination/Pagination"));

const MovieListFetcher = () => {
	const [movies, setMovies] = useState([]);
	const [allMovies, setAllMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [isLoading, setIsLoading] = useState(true);
	const [sortOrder, setSortOrder] = useState("asc");

	useEffect(() => {
		const fetchMovies = async () => {
			setIsLoading(true);
			try {
				let url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchTerm}&page=${currentPage}`;
				if (searchTerm === "") {
					url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/top?type=TOP_100_POPULAR_FILMS&page=${currentPage}`;
				}
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"X-API-KEY": "3fc2842c-a40f-463a-806b-531db07f0746",
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch movies");
				}
				const data = await response.json();
				const fetchedMovies = data.films;
				setAllMovies(fetchedMovies);
				setMovies(fetchedMovies);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		};

		fetchMovies();
	}, [currentPage, searchTerm]);

	useEffect(() => {
		let sortedMovies = [...allMovies];

		if (filterType === "year") {
			sortedMovies.sort((a, b) => {
				return sortOrder === "asc"
					? parseInt(a.year, 10) - parseInt(b.year, 10)
					: parseInt(b.year, 10) - parseInt(a.year, 10);
			});
		} else if (filterType === "rating") {
			sortedMovies.sort((a, b) => {
				return sortOrder === "asc"
					? parseFloat(a.rating) - parseFloat(b.rating)
					: parseFloat(b.rating) - parseFloat(a.rating);
			});
		}

		setMovies(sortedMovies);
	}, [filterType, allMovies, sortOrder]);

	const handleMovieClick = (movie) => {
		setSelectedMovie(movie);
	};

	const handleInputChange = (value) => {
		setSearchTerm(value);
	};

	const handleFilterChange = (type) => {
		setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
		setFilterType(type);
	};

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

	return (
        <div>
            <Suspense fallback={<Loader />}>
                {selectedMovie ? (
                    <LazySelectedMovie
                        movieId={selectedMovie.filmId}
                        selectedMovie={selectedMovie}
                        setSelectedMovie={setSelectedMovie}
                    />
                ) : (
                    <>
                        <h2>Открой для себя мир кино</h2>
                        <LazyDebouncedInput handleInputChange={handleInputChange} delay={500} />
                        <LazyFilterButtons
                            handleFilterChange={handleFilterChange}
                            filterType={filterType}
                            sortOrder={sortOrder}
                        />
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <>
                                <LazyMovieListContent
                                    movies={currentMovies}
                                    onMovieClick={handleMovieClick}
                                />
                                <LazyPagination
                                    moviesPerPage={moviesPerPage}
                                    totalMovies={allMovies.length}
                                    paginate={paginate}
                                />
                            </>
                        )}
                    </>
                )}
            </Suspense>
        </div>
    );
};

export default MovieListFetcher;