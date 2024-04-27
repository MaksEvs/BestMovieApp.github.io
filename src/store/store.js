import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import favoriteReducer from "./favoriteSlice";
import moviesSlice from "./movies-slice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		favorite: favoriteReducer,
		movies: moviesSlice.reducer,
	},
});

export default store;
