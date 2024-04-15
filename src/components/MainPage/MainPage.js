import React from "react";
import Header from "../Header/Header";
import './MainPage.css'
import Input from "../Input/Input";
import FilterMovies from "../FilterMovies/FilterMovies";


const MainPage = () => {
	return (
		<div className="MainPage">
			<Header/>
			<div>
				<h1>Главная страница</h1>

				<div className="main__text">List of movies and TV Shows, I, Pramod Poudel have watched till date. Explore what I have watched and also feel free to make a suggestion. 😉</div>

			<Input/>

			<FilterMovies/>

		
			</div>
		</div>
	);
};

export default MainPage;
