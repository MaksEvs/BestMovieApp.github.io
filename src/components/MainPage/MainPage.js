import React, { useEffect } from "react";
import Header from "../Header/Header";
import MovieListFetcher from "./MovieList/MovieListFetcher";
import "./MainPage.css";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch } from "react-redux";
import { fetchMoviesStart } from "../../store/movies-slice";

const MainPage = () => {
	const dispatchAction = useDispatch();

	useEffect(() => {
		dispatchAction(fetchMoviesStart());
	}, [dispatchAction]);

	const { theme } = useTheme();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	return (
		<div className="main-page">
			<Header />
			<div className={`wrapper ${theme === "dark" ? "dark" : "light"}`}>
				<MovieListFetcher />
			</div>
		</div>
	);
};

export default MainPage;
