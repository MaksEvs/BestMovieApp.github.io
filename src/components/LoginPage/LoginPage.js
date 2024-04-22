import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./LoginPage.css";

const LoginPage = (props) => {
	const { theme } = useTheme();
	
	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	return (
		<div className={`wrapper wrapper-login ${theme === "dark" ? "dark" : "light"}`}>
			<h1>Войдите или зарегистрируйтесь</h1>
			<form onSubmit={props.loginHandler}>
				<input
					type="text"
					name="username"
					placeholder="Имя пользователя"
					className={`input-oval ${theme}`}
					value={props.username}
					onChange={props.inputChangeHandler}
				/>
				<input
					type="password"
					name="password"
					placeholder="Пароль"
					className={`input-oval ${theme}`}
					value={props.password}
					onChange={props.inputChangeHandler}
				/>
				<div className="button">
				<button type="submit" className={`login ${theme}`}>
    				Вход
				</button>
				<Link to="/register" className={`register ${theme}`}>
					Регистрация
				</Link>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;