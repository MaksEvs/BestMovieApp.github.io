import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
	const { theme } = useTheme();
	const navigate = useNavigate();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	const navigateToHome = () => {
		navigate("/");
	};

	return (
		<div className="not-found-page">
			<div className="page-heading">
				<h1>404 - Не найдено</h1>
			</div>
			<div className="page-text">
				<p>
					Запрашиваемая вами страница на сервере отсутствует или была перемещена
					в другое место. Также вы можете проверить адрес, который пытаетесь
					открыть.
				</p>
				<p>Приносим извинения за предоставленные неудобства.</p>
			</div>
			<button className="btn-turned-back" onClick={navigateToHome}>
				Вернуться на главную
			</button>
		</div>
	);
};

export default NotFoundPage;
