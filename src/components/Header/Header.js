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
if (currentPage === "/" || currentPage === "/favorites") {
    headerContent = (
        <div className="header__content">
            <Link to="/" className="header__link">Главная</Link>
            <Link to="/favorites" className="header__link">Избранное</Link>
            {isLoggedIn ? (
                <div>
                    <span className="username">{localStorage.getItem("username")}</span>
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
            <Link to="/favorites" className="header__link">Избранное</Link>
            {isLoggedIn ? (
                <div>
                    <span className="username">{localStorage.getItem("username")}</span>
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
		<div className="header__logo">
			<a href="#">
			<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"  >
				<path d="M9.25621 15.7628L26.7802 4.768C30.097 2.6872 34.4002 5.0796 34.4002 9.0052V30.9948C34.4002 34.92 30.097 37.3128 26.7802 35.232L9.25621 24.2372C6.1366 22.2796 6.1366 17.7204 9.25621 15.7628Z" fill="#4BB7FD"/>
				<path d="M30.7441 15.7628L13.2201 4.768C9.9033 2.6872 5.6001 5.0796 5.6001 9.0052V30.9948C5.6001 34.92 9.9033 37.3128 13.2201 35.232L30.7441 24.2372C33.8637 22.2796 33.8637 17.7204 30.7441 15.7628Z" fill="#7B6EF6"/>
			</svg>
			</a>
		</div>
		{headerContent}	
	</header>
);
};

export default Header;
