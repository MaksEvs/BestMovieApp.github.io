import React from "react";
import Header from "../Header/Header";
import './MainPage.css'
import Input from "../Input/Input";
import FilterMovies from "../FilterMovies/FilterMovies";
import MovieList from '../MovieList/MovieList';
import MovieListHeading from '../MovieList/MovieListHeading/MovieListHeading';

const MainPage = ({ movies, setSearchValue }) => {
    return (
        <div className="MainPage">
            <Header/>
            <div>
                <h1>Главная страница</h1>

                <div className="main__text">List of movies and TV Shows, I, Pramod Poudel have watched till date. Explore what I have watched and also feel free to make a suggestion. 😉</div>

                <MovieListHeading heading="Discover Movies" />
                {setSearchValue && <Input setSearchValue={setSearchValue} />}
				{/* компонент Input будет отображаться только в том случае, если setSearchValue была передана в компонент MainPage */}

                <FilterMovies/>

                <MovieList movies={movies} />

            </div>
        </div>
    );
};

export default MainPage;