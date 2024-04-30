import React,  {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addToFavorites,
	removeFromFavorites,
	setFavorites
} from "../../../../../store/favoriteSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../../context/ThemeContext";
import './LikeButton.css'

const LikeButton = ({ movieId }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorite.favorites);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const username = useSelector((state) => state.auth.username);
	const { theme } = useTheme();

	const isFavorite = favorites.includes(movieId);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem(username));
		if (userData) {
			dispatch(setFavorites(userData.favorites));
		}
	}, [dispatch, username]);

	const handleLike = () => {
		if (!isLoggedIn) {
			navigate("/login");
		} else {
			if (isFavorite) {
				dispatch(removeFromFavorites(movieId));
				const userData = JSON.parse(localStorage.getItem(username));

				userData.favorites = userData.favorites.filter(
					(favMovieId) => favMovieId !== movieId
				);
				localStorage.setItem(username, JSON.stringify(userData));
			} else {
				dispatch(addToFavorites(movieId));
				const userData = JSON.parse(localStorage.getItem(username));
				userData.favorites.push(movieId);
				localStorage.setItem(username, JSON.stringify(userData));
			}
		}
	};

	return (
		<button onClick={handleLike} className={`button-like ${
			theme === "dark" ? "dark" : "light"
		}`}>
			{isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
		</button>
	);
};

export default LikeButton;
