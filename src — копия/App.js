import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPageContainer from "./components/LoginPage/LoginPageContainer";
import RegisterPageContainer from "./components/LoginPage/RegisterPageContainer";
import FavoritesPage from "./components/FavoritePage/FavoritePage";
import SelectedMovie from "./components/MainPage/MovieList/SelectedMovie/SelectedMovie";
import { ThemeProvider } from "./context/ThemeContext";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("username")
	);
	const [searchValue, setSearchValue] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const username = localStorage.getItem("username");
		if (username) {
			setIsLoggedIn(true);
			dispatch(login({ username }));
		} else {
			setIsLoggedIn(false);
			dispatch(logout());
		}
	}, [dispatch]);

	const handleLogin = (username) => {
		localStorage.setItem("username", username);
		setIsLoggedIn(true);
		dispatch(login({ username }));
	};

	const handleLogout = () => {
		localStorage.removeItem("username");
		setIsLoggedIn(false);
		dispatch(logout());
	};

	const handleRegister = (username) => {
		localStorage.setItem("username", username);
		setIsLoggedIn(true);
		dispatch(login({ username }));
	};

	return (
		<ThemeProvider>
			<BrowserRouter>
				<div>
					<Routes>
						<Route
							path="/"
							element={
								<MainPage
									isLoggedIn={isLoggedIn}
									onLogout={handleLogout}
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
								<FavoritesPage
									isLoggedIn={isLoggedIn}
									onLogout={handleLogout}
								/>
							}
						/>
						<Route path="/film/:id" element={<SelectedMovie />} />
						<Route path="/not-found" element={<NotFoundPage />} />
						<Route path="*" element={<Navigate to="/not-found" />} />
					</Routes>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
