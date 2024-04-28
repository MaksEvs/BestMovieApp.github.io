import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./FavoritesPage.css";
import { useTheme } from "../../context/ThemeContext";
import FavoriteFilmItem from "./FavoriteFilmItem";

const FavoritesPage = (props) => {
	const { theme } = useTheme();
	const navigate = useNavigate();

	const username = localStorage.getItem("username");
	const userString = localStorage.getItem(username);
	const user = JSON.parse(userString);
	const favorites = user.favorites;

	console.log(favorites);
	if (!props.isLoggedIn) {
		navigate("/login");
	}

	return (
		<div>
			<Header />
			<div
				className={`wrapper wrapper-favorites ${
					theme === "dark" ? "dark" : "light"
				}`}
			>
				<ul className="movie-list">
					{favorites.map((filmID) => {
						return <FavoriteFilmItem filmID={filmID} />;
					})}
				</ul>
			</div>
		</div>
	);
};

export default FavoritesPage;
