import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [], // массив фильмов
    loading: false, // флаг загрузки данных
    error: null, // ошибка при загрузке данных
    filterType: 'all',
    sortOrder: 'asc',
  },
  reducers: {
    fetchMoviesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    fetchMoviesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilterType(state, action) {
        state.filterType = action.payload;
    },
    setSortOrder(state, action) {
        state.sortOrder = action.payload;
    },
  },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } = moviesSlice.actions;
export const { setFilterType, setSortOrder } = moviesSlice.actions;
export default moviesSlice;