import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../Header/Header";

const RegisterPage = (props) => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		repeatPassword: "",
	});
	const [registered, setRegistered] = useState(false);
	const [error, setError] = useState("");

	const inputChandeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const registerHandler = (e) => {
		e.preventDefault();
		const { username, password, repeatPassword } = formData;

		if (localStorage.getItem(username)) {
			setError("Пользователь с таким никнеймом уже существует");
			return;
		}

		if (password.length < 6) {
			setError("Пароль должен содержать не менее 6 символов");
			return;
		}

		if (password !== repeatPassword) {
			setError("Пароли не совпадают");
			return;
		}

		localStorage.setItem(username, JSON.stringify({ password }));
		props.onRegister(username);
		setRegistered(true);
	};

	if (registered) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			<Header />
			<div>
				<h1>Форма регистрации</h1>
				<form onSubmit={registerHandler}>
					<input
						type="text"
						name="username"
						placeholder="Имя пользователя"
						value={formData.username}
						onChange={inputChandeHandler}
					/>
					<input
						type="password"
						name="password"
						placeholder="Пароль"
						value={formData.password}
						onChange={inputChandeHandler}
					/>
					<input
						type="password"
						name="repeatPassword"
						placeholder="Повторите пароль"
						value={formData.repeatPassword}
						onChange={inputChandeHandler}
					/>
					<button type="submit">Зарегистрироваться</button>
				</form>
				{error && <p style={{ color: "red" }}>{error}</p>}
			</div>
		</div>
	);
};

export default RegisterPage;
