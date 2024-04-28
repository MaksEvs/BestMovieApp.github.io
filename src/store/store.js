import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import favoriteReducer from "./favoriteSlice";
import moviesSlice from "./moviesSlice";
import apiSlice from "./apiSlice";

// Импортируем middleware для RTK-Query
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
	reducer: {
		auth: authReducer,
		favorite: favoriteReducer,
		movies: moviesSlice.reducer,
		api: apiSlice.reducer,
	},
	// Добавляем middleware для RTK-Query
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

// Устанавливаем слушателей для RTK-Query
setupListeners(store.dispatch);

export default store;