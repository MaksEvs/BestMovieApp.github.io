import React from "react";
import "./RegisterPage.css";

const RegisterPage = (props) => {
	// const { formData = , inputChangeHandler, registerHandler, error } = props;

	return (
		<div className="wrapper">
			<h1>Форма регистрации</h1>
			<form onSubmit={props.registerHandler}>
				<input
					type="text"
					name="username"
					placeholder="Имя пользователя"
					value={props.formData.username}
					onChange={props.inputChangeHandler}
				/>
				<input
					type="password"
					name="password"
					placeholder="Пароль"
					value={props.formData.password}
					onChange={props.inputChangeHandler}
				/>
				<input
					type="password"
					name="repeatPassword"
					placeholder="Повторите пароль"
					value={props.formData.repeatPassword}
					onChange={props.inputChangeHandler}
				/>
				<button type="submit" className="register__button">
					Зарегистрироваться
				</button>
			</form>
			{props.error && <p style={{ color: "red" }}>{props.error}</p>}
		</div>
	);
};

export default RegisterPage;
