import React, { useEffect } from "react";
import Header from "../Header/Header";
import MovieListFetcher from "./MovieList/MovieListFetcher";
import "./MainPage.css";
import { useTheme } from "../../context/ThemeContext";

// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const MainPage = () => {
	// const throwError = () => {
	// 	try {
	// 		throw new Error("This is a test error for ErrorBoundary");
	// 	} catch (error) {
	// 		console.error("Error caught in throwError:", error);
	// 	}
	// };

	const { theme } = useTheme();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	return (
			<div className="main-page">
				<Header />
				{/* <button onClick={throwError}>Generate Error</button> */}
				<div className={`wrapper ${theme === "dark" ? "dark" : "light"}`}>
					<MovieListFetcher />
				</div>
			</div>
	);
};

export default MainPage;