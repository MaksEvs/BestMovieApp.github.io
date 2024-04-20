import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPageContainer from "./components/LoginPage/LoginPageContainer";
import RegisterPageContainer from "./components/LoginPage/RegisterPageContainer";
import FavoritesPage from "./components/FavoritePage/FavoritePage";

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
		<HashRouter>
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
							<FavoritesPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
						}
					/>
				</Routes>
			</div>
		</HashRouter>
	);
};

export default App;
