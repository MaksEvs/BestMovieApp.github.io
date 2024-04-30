import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { register } from "../../store/authSlice";
import RegisterPage from "./RegisterPage";
import Header from "../Header/Header";

const RegisterPageContainer = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		repeatPassword: "",
	});
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const registerHandler = (event) => {
		event.preventDefault();
		const { username, password, repeatPassword } = formData;
		const userExists = !!localStorage.getItem(username);
		if (userExists) {
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
		const userData = {
			password,
			favorites: [],
		};
		localStorage.setItem(username, JSON.stringify(userData));
		dispatch(register({ username }));
		localStorage.setItem("username", username);
	};

	if (isLoggedIn) {
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
