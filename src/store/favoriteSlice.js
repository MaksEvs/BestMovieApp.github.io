import { createSlice } from "@reduxjs/toolkit";

const getInitialFavorites = () => {
	const favoritesFromStorage = localStorage.getItem("favorites");
	return favoritesFromStorage ? JSON.parse(favoritesFromStorage) : [];
};

const initialState = {
	favorites: getInitialFavorites(),
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
	},
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
