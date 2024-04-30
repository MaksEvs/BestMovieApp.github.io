import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import LoginPage from "./LoginPage";
import Header from "../Header/Header";

const LoginPageContainer = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const inputChangeHandler = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const loginHandler = (event) => {
		event.preventDefault();
		const { username, password } = formData;
		const userExists = localStorage.getItem(username);
		if (!userExists) {
			setError("Пользователя с таким именем не существует");
			return;
		}
		const userData = JSON.parse(userExists);
		if (userData.password !== password) {
			setError("Неверный пароль");
			return;
		}
		dispatch(login({ username }));
		localStorage.setItem("username", username);
	};

	if (isLoggedIn) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<Header />
			<LoginPage
				formData={formData}
				inputChangeHandler={inputChangeHandler}
				loginHandler={loginHandler}
				error={error}
			/>
		</>
	);
};

export default LoginPageContainer;
