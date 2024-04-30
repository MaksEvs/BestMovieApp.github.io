import { createSlice } from "@reduxjs/toolkit";

const getInitialFavorites = () => {
	const favoritesFromStorage = localStorage.getItem("favorites");
	return favoritesFromStorage ? JSON.parse(favoritesFromStorage) : [];
};

const initialState = {
	favorites: getInitialFavorites(),
	currentPage: 1, 
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

		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setFavorites(state, action) {
			state.favorites = action.payload;
		  }
	},
});

export const { addToFavorites, removeFromFavorites, setCurrentPage, setFavorites } =
	favoriteSlice.actions;

export const selectFavorites = (state) => state.favorite.favorites; 
export const selectCurrentPage = (state) => state.favorite.currentPage; 

export default favoriteSlice.reducer;
