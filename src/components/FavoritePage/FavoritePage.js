import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./FavoritesPage.css";
import { useTheme } from "../../context/ThemeContext";

const FavoritesPage = (props) => {
	const { theme } = useTheme();
	const navigate = useNavigate();

	if (!props.isLoggedIn) {
		navigate("/login"); // Переход на страницу логина, если пользователь не авторизован
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