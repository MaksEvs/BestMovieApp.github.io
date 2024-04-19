import React from "react";
import Header from "../Header/Header";
import './MainPage.css'
import MovieList from './MovieList/MovieList';
import MovieListHeading from './MovieList/MovieListHeading/MovieListHeading';



const MainPage = ({ movies}) => {

	return (
		<div>
			<Header />
			<div className="wrapper">
				<MovieListHeading heading="Откройте для себя мир кино" />

				<MovieList movies={movies} />
			</div>
		</div>
	);
};

export default MainPage;
