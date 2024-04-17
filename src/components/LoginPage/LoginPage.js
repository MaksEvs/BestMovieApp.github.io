import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = (props) => {
	return (
		<div className="wrapper">
			<h1>Войдите или зарегистрируйтесь</h1>
			<form onSubmit={props.loginHandler}>
				<input
					type="text"
					name="username"
					placeholder="Имя пользователя"
					value={props.username}
					onChange={props.inputChangeHandler}
				/>
				<input
					type="password"
					name="password"
					placeholder="Пароль"
					value={props.password}
					onChange={props.inputChangeHandler}
				/>
				<button type="submit" className="log">
					Вход
				</button>
			</form>
			<Link to="/register" className="registration">
				Регистрация
			</Link>
		</div>
	);
};

export default LoginPage;
