import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import Header from "../Header/Header";

const RegisterPageContainer = (props) => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		repeatPassword: "",
	});
	const [error, setError] = useState("");
	const [registered, setRegistered] = useState(false);

	const inputChangeHandler = (e) => {
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
		<>
			<Header />
			<RegisterPage
				formData={formData}
				inputChangeHandler={inputChangeHandler}
				registerHandler={registerHandler}
				error={error}
			/>
		</>
	);
};

export default RegisterPageContainer;
