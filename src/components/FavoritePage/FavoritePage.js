import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../Header/Header";

const FavoritesPage = (props) => {
	if (!props.isLoggedIn) {
		return <Navigate to="/login" />;
	}

	return (
		<div>
			<Header />
			<div>
				<h1>Избранное</h1>
			</div>
		</div>
	);
};

export default FavoritesPage;
