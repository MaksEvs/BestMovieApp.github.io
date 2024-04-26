import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPageContainer from "./components/LoginPage/LoginPageContainer";
import RegisterPageContainer from "./components/LoginPage/RegisterPageContainer";
import FavoritesPage from "./components/FavoritePage/FavoritePage";
import SelectedMovie from "./components/MainPage/MovieList/SelectedMovie/SelectedMovie";
import { ThemeProvider } from "./context/ThemeContext";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("username")
	);

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
