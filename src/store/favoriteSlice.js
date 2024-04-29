import { createSlice } from "@reduxjs/toolkit";

const getInitialFavorites = () => {
	const favoritesFromStorage = localStorage.getItem("favorites");
	return favoritesFromStorage ? JSON.parse(favoritesFromStorage) : [];
};

const initialState = {
	favorites: getInitialFavorites(),
	currentPage: 1, // Добавляем новое поле для хранения текущей страницы
};

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		addToFavorites(state, action) {
			state.favorites.push(action.payload);
		},
		removeFromFavorites(state, action) {
			state.favorites = state.favorites.filter((id) => id !== action.payload);
		},
		// Новый экшен для установки текущей страницы
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
	},
});

export const { addToFavorites, removeFromFavorites, setCurrentPage } =
	favoriteSlice.actions;

export const selectFavorites = (state) => state.favorite.favorites; // Селектор для получения избранных фильмов
export const selectCurrentPage = (state) => state.favorite.currentPage; // Селектор для получения текущей страницы

export default favoriteSlice.reducer;
