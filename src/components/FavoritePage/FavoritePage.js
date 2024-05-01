import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./FavoritesPage.css";
import { useTheme } from "../../context/ThemeContext";
import FavoriteFilmItem from "./FavoriteFilmItem";
import FavoritePagination from "./FavoritePagination";
import {
	selectCurrentPage,
	setCurrentPage,
} from "../../store/selectedPageSlice";
import { selectIsLoggedIn } from "../../store/authSlice";

const FavoritesPage = () => {
	const { theme } = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentPage = useSelector(selectCurrentPage);
	const isLoggedIn = useSelector(selectIsLoggedIn);

	console.log("favorite", isLoggedIn);

	const username = localStorage.getItem("username");
	const userString = localStorage.getItem(username);
	const user = JSON.parse(userString);
	const favorites = user ? user.favorites : [];

	const itemsPerPage = 10;
	const totalPages = Math.ceil(favorites.length / itemsPerPage);

	const paginate = (pageNumber) => {
		dispatch(setCurrentPage(pageNumber));
		localStorage.setItem("favoriteCurrentPage", pageNumber);
	};

	useEffect(() => {
		const currentPageFromStorage = localStorage.getItem("favoriteCurrentPage");
		if (currentPageFromStorage) {
			dispatch(setCurrentPage(parseInt(currentPageFromStorage)));
		}
		if (!isLoggedIn) {
			navigate("/login");
		}
	}, [isLoggedIn, navigate, dispatch]);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = favorites.slice(indexOfFirstItem, indexOfLastItem);

	return (
		<div>
			<Header />
			{favorites.length === 0 ? 
			
			<div
				className={`wrapper-favorites ${theme === "dark" ? "dark" : "light"}`}
			>
			<h1>Фильмов в избранном нету</h1>
			</div>
			
			:
			
			<div
				className={`wrapper-favorites ${theme === "dark" ? "dark" : "light"}`}
			>
				<ul className="favorites-list">
					{currentItems.map((filmID) => (
						<FavoriteFilmItem filmID={filmID} key={filmID} />
					))}
				</ul>
				<FavoritePagination
					currentPage={currentPage}
					totalPages={totalPages}
					paginate={paginate}
				/>
			</div> }

			

			
		</div>
	);
};

export default FavoritesPage;
