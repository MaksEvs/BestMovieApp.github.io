import React, { useEffect } from "react";
import Header from "../Header/Header";
import MovieListFetcher from "./MovieList/MovieListFetcher";
import "./MainPage.css";
import { useTheme } from "../../context/ThemeContext";

const MainPage = () => {
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
