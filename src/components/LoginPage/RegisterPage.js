import React, { useEffect } from "react";
import "./RegisterPage.css";
import { useTheme } from "../../context/ThemeContext";

const RegisterPage = (props) => {
	const { theme } = useTheme();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	return (
		<div className={`wrapper-registr ${theme === "dark" ? "dark" : "light"}`}>
			<h1>Форма регистрации</h1>
			{props.error && <p style={{ color: "red" }}>{props.error}</p>}
			<form onSubmit={props.registerHandler}>
				<input
					type="text"
					name="username"
					placeholder="Имя пользователя"
					className={`input-oval ${theme}`}
					value={props.formData.username}
					onChange={props.inputChangeHandler}
				/>
				<input
					type="password"
					name="password"
					placeholder="Пароль"
					className={`input-oval ${theme}`}
					value={props.formData.password}
					onChange={props.inputChangeHandler}
				/>
				<input
					type="password"
					name="repeatPassword"
					placeholder="Повторите пароль"
					className={`input-oval ${theme}`}
					value={props.formData.repeatPassword}
					onChange={props.inputChangeHandler}
				/>
				<button
					type="submit"
					className={`registration ${
						theme === "light" ? "light-theme" : "dark-theme"
					}`}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default RegisterPage;
