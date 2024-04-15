import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Header.css'


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
			<div className="header__content">
				<Link to="/" className="header__link">Главная</Link>
				<Link to="/favorites" className="header__link">Избранное</Link>
				{isLoggedIn ? (
					<div>
						<span>{localStorage.getItem("username")}</span>
						<button onClick={logoutHandler}>Выход</button>
					</div>
				) : (
					<Link to="/login" className="header__link">Вход</Link>
				)}
			</div>
		);
	} else if (currentPage === "/login" || currentPage === "/register") {
		headerContent = (
			<div className="header__content">
				<Link to="/" className="header__link">Главная</Link>
			</div>
		);
	} else if (currentPage === "/favorites") {
		headerContent = (
			<div className="header__content">
				<Link to="/" className="header__link">Главная</Link>
				{isLoggedIn ? (
					<div>
						<span>{localStorage.getItem("username")}</span>
						<button onClick={logoutHandler}>Выход</button>
					</div>
				) : (
					<Link to="/login" className="header__link">Вход</Link>
				)}
			</div>
		);
	} else {
		headerContent = (
			<div className="header__content">
				<Link to="/" className="header__link">Главная</Link>
			</div>
		);
	}

	return (
	<header>
		<div  className="header__logo">
			<a href="#">
				<img src="../../icons/logo.svg" alt="logo"></img>
			</a>
			
		</div>
		{headerContent}	
	</header>
);
};

export default Header;
