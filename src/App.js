import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPageContainer from "./components/LoginPage/LoginPageContainer";
import RegisterPageContainer from "./components/LoginPage/RegisterPageContainer";
import FavoritesPage from "./components/FavoritePage/FavoritePage";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("username")
	);

	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const handleLogin = (username) => {
		localStorage.setItem("username", username);
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("username");
		setIsLoggedIn(false);
	};

	const handleRegister = (username) => {
		localStorage.setItem("username", username);
		setIsLoggedIn(true);
	};

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	return (
		<Router>
			<div>
				<Routes>
					<Route
						path="/"
						element={
							<MainPage
								isLoggedIn={isLoggedIn}
								onLogout={handleLogout}
								movies={movies}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
							/>
						}
					/>
					<Route
						path="/login"
						element={<LoginPageContainer onLogin={handleLogin} />}
					/>
					<Route
						path="/register"
						element={<RegisterPageContainer onRegister={handleRegister} />}
					/>
					<Route
						path="/favorites"
						element={
							<FavoritesPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
