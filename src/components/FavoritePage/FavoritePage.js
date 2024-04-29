import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./FavoritesPage.css";
import { useTheme } from "../../context/ThemeContext";
import FavoriteFilmItem from "./FavoriteFilmItem";
import FavoritePagination from "./FavoritePagination";

const FavoritesPage = (props) => {
	const { theme } = useTheme();
	const navigate = useNavigate();

	const username = localStorage.getItem("username");
	const userString = localStorage.getItem(username);
	const user = JSON.parse(userString);
	const favorites = user.favorites;

	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const [currentItems, setCurrentItems] = useState([]);

	useEffect(() => {
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		setCurrentItems(favorites.slice(indexOfFirstItem, indexOfLastItem));
	}, [currentPage, favorites]);

	const totalPages = Math.ceil(favorites.length / itemsPerPage);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	if (!props.isLoggedIn) {
		navigate("/login");
	}

	return (
		<div>
			<Header />
			<div
				className={`wrapper-favorites ${theme === "dark" ? "dark" : "light"}`}
			>
				<ul className="favorites-list">
					{currentItems.map((filmID) => {
						return <FavoriteFilmItem filmID={filmID} key={filmID} />;
					})}
				</ul>
				<FavoritePagination
					currentPage={currentPage}
					totalPages={totalPages}
					paginate={paginate}
				/>
			</div>
		</div>
	);
};

export default FavoritesPage;
