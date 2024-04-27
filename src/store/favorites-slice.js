import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: [], // массив избранных фильмов
    currentPage: 1, // текущая страница пагинации
    itemsPerPage: 10, // количество элементов на странице
  },
  reducers: {
    addFavorite: (state, action) => {
      state.movies.push(action.payload); // добавление фильма в избранное
    },
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload.id); // удаление фильма из избранного
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload; // установка текущей страницы
    },
  },
});

export const { addFavorite, removeFavorite, setCurrentPage } = favoritesSlice.actions;
export default favoritesSlice;