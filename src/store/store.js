import { configureStore } from '@reduxjs/toolkit';
import favoritesSlice from './favorites-slice';
import moviesSlice from './movies-slice';

const store = configureStore({
    reducer: {
        favorites: favoritesSlice.reducer,
        movies: moviesSlice.reducer,
    }
})

export default store;