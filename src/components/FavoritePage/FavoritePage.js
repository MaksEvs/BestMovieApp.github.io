import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../Header/Header";
import "./FavoritesPage.css";
import { useTheme } from "../../context/ThemeContext";

const FavoritesPage = (props) => {
	const { theme } = useTheme();

	if (!props.isLoggedIn) {
		return <Navigate to="/login" />;
	}

	return (
		<div>
			<Header />
			<div
				className={`wrapper wrapper-favorites ${
					theme === "dark" ? "dark" : "light"
				}`}
			>
				<h1>Избранное</h1>
			</div>
		</div>
	);
};

export default FavoritesPage;
