import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/LoginPage/RegisterPage";
import FavoritesPage from "./components/FavoritePage/FavoritePage";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("username")
	);

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
		<Router>
			<div>
				<Routes>
					<Route
						path="/"
						element={
							<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
						}
					/>
					<Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
					<Route
						path="/register"
						element={<RegisterPage onRegister={handleRegister} />}
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
