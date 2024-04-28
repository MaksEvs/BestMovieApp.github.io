import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = '60d88c1c-9dd4-447c-a020-cbd9ef01e010';

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