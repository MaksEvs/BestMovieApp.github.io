import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const LoginPage = (props) => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [loggedIn, setLoggedIn] = useState(false);

	const inputChangeHandler = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const loginHandler = (event) => {
		event.preventDefault();
		const { username, password } = formData;
		if (localStorage.getItem(username) === JSON.stringify({ password })) {
			props.onLogin(username);
			setLoggedIn(true);
		}
	};

	if (loggedIn) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			<header>
				<Link to="/">Главная</Link>
			</header>
			<div>
				<h1>Вход</h1>
				<form onSubmit={loginHandler}>
					<input
						type="text"
						name="username"
						placeholder="Имя пользователя"
						value={formData.username}
						onChange={inputChangeHandler}
					/>
					<input
						type="password"
						name="password"
						placeholder="Пароль"
						value={formData.password}
						onChange={inputChangeHandler}
					/>
					<button type="submit">Вход</button>
				</form>
				<Link to="/register">Регистрация</Link>
			</div>
		</div>
	);
};

export default LoginPage;
