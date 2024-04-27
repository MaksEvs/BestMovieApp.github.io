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
		const { username } = formData;
		const userExists = !!localStorage.getItem(username);
		if (userExists) {
			dispatch(login({ username }));
			localStorage.setItem("username", username);
		}
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
			/>
		</>
	);
};

export default LoginPageContainer;
