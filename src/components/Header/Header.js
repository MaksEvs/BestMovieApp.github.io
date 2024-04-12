import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Определяем, на какой странице мы находимся
	const currentPage = location.pathname;

	const logoutHandler = () => {
		localStorage.removeItem("username");
		navigate("/");
	};

	// Проверяем, залогинен ли пользователь
	const isLoggedIn = localStorage.getItem("username");

	// Содержимое заголовка в зависимости от текущей страницы и состояния авторизации
	let headerContent = null;
	if (currentPage === "/") {
		headerContent = (
			<div>
				<Link to="/">Главная</Link>
				<Link to="/favorites">Избранное</Link>
				{isLoggedIn ? (
					<div>
						<span>{localStorage.getItem("username")}</span>
						<button onClick={logoutHandler}>Выход</button>
					</div>
				) : (
					<Link to="/login">Вход</Link>
				)}
			</div>
		);
	} else if (currentPage === "/login" || currentPage === "/register") {
		headerContent = (
			<div>
				<Link to="/">Главная</Link>
			</div>
		);
	} else if (currentPage === "/favorites") {
		headerContent = (
			<div>
				<Link to="/">Главная</Link>
				{isLoggedIn ? (
					<div>
						<span>{localStorage.getItem("username")}</span>
						<button onClick={logoutHandler}>Выход</button>
					</div>
				) : (
					<Link to="/login">Вход</Link>
				)}
			</div>
		);
	} else {
		headerContent = (
			<div>
				<Link to="/">Главная</Link>
			</div>
		);
	}

	return <header>{headerContent}</header>;
};

export default Header;
