import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = '5cb2c529-2c32-4ec9-8ff8-a488a598b672';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', apiKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMoviesByKeyword: builder.query({
      query: ({ keyword, page }) => `/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`,
    }),
    getTopMovies: builder.query({
      query: (page) => `/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`,
    }),
    getMovieById: builder.query({
      query: (id) => `/api/v2.2/films/${id}`,
    }),
  }),
});

export const { useGetMoviesByKeywordQuery, useGetTopMoviesQuery, useGetMovieByIdQuery } = apiSlice;
export default apiSlice;