import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import favoriteReducer from "./favoriteSlice";
import moviesSlice from "./moviesSlice";
import apiSlice from "./apiSlice";
import selectedPageSlice from "./selectedPageSlice";

import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
	reducer: {
		auth: authReducer,
		favorite: favoriteReducer,
		movies: moviesSlice.reducer,
		api: apiSlice.reducer,
		selectedPage: selectedPageSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
