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
					className="input-oval"
					value={props.username}
					onChange={props.inputChangeHandler}
				/>
				<input
					type="password"
					name="password"
					placeholder="Пароль"
					className="input-oval"
					value={props.password}
					onChange={props.inputChangeHandler}
				/>
				<div className="button">
					<button type="submit" className="login">
						Вход
					</button>
					<Link to="/register" className="register">
						Регистрация
					</Link>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
