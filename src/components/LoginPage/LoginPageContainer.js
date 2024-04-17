import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Header from "../Header/Header";

const LoginPageContainer = (props) => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [loggedIn, setLoggedIn] = useState(false);

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
		if (localStorage.getItem(username) === JSON.stringify({ password })) {
			props.onLogin(username);
			setLoggedIn(true);
		}
	};

	if (loggedIn) {
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
