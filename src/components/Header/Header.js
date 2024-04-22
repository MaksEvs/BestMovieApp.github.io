import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import "./Header.css";

const Header = () => {
	const { theme, toggleTheme } = useTheme();
	const location = useLocation();
	const navigate = useNavigate();
	const currentPage = location.pathname;
	const isLoggedIn = localStorage.getItem("username");
	const favoritesLink = isLoggedIn ? "/favorites" : "/login";

	const logoutHandler = () => {
		localStorage.removeItem("username");
		navigate("/");
	};

	const favoritesClickHandler = () => {
		if (!isLoggedIn) {
			navigate("/login");
		}
	};

	return (
		<header className={`header ${theme === "light" ? "theme-light" : "theme-dark"}`}>
			<div className="header__logo">
				<a href="/">					
					<svg
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="header__img"
					>
						<path
							d="M9.25621 15.7628L26.7802 4.768C30.097 2.6872 34.4002 5.0796 34.4002 9.0052V30.9948C34.4002 34.92 30.097 37.3128 26.7802 35.232L9.25621 24.2372C6.1366 22.2796 6.1366 17.7204 9.25621 15.7628Z"
							fill="#4BB7FD"
						/>
						<path
							d="M30.7441 15.7628L13.2201 4.768C9.9033 2.6872 5.6001 5.0796 5.6001 9.0052V30.9948C5.6001 34.92 9.9033 37.3128 13.2201 35.232L30.7441 24.2372C33.8637 22.2796 33.8637 17.7204 30.7441 15.7628Z"
							fill="#7B6EF6"
						/>
					</svg>
				</a>

		
			</div>

			<div className="header__content">
				{(currentPage !== "/login" && currentPage !== "/register") || !isLoggedIn ? (
					<Link to={favoritesLink} className="header__link" onClick={favoritesClickHandler}>
						Избранное
					</Link>
				) : null}

				{isLoggedIn ? (
					<div className="user-block">
						<span className="username">{localStorage.getItem("username")}</span>
						<button onClick={logoutHandler} className="logout_button">
							Выход
						</button>
					</div>
				) : (
					<Link to="/login" className="header__link">
						Вход
					</Link>
				)}

				<button onClick={toggleTheme} className="theme-toggle-button">
					{theme === "light" ? <FiMoon /> : <FiSun />}
				</button>
			</div>
		</header>
	);
};

export default Header;