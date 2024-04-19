import React from "react";
import Header from "../Header/Header";
import './MainPage.css'
import Input from "../Input/Input";
import MovieList from '../MovieList/MovieList';
import MovieListHeading from '../MovieList/MovieListHeading/MovieListHeading';
import FilterMovies from "../FilterMovies/FilterMovies";


const MainPage = ({ movies, setSearchValue }) => {
    return (
        <div >
            <Header/>
            <div className="wrapper">

                <MovieListHeading heading="Откройте для себя мир кино" />
                {setSearchValue && <Input setSearchValue={setSearchValue} />}
				{/* компонент Input будет отображаться только в том случае, если setSearchValue была передана в компонент MainPage */}
{/* {
                <FilterMovies/>} */}



                <MovieList movies={movies} />

            </div>
        </div>
    );
};

export default MainPage;