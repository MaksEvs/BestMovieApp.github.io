import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "9f23075d-6761-46d1-ac4c-abbe40c01461";

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://kinopoiskapiunofficial.tech",
		prepareHeaders: (headers) => {
			headers.set("X-API-KEY", apiKey);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getMoviesByKeyword: builder.query({
			query: ({ keyword, page }) =>
				`/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`,
		}),
		getTopMovies: builder.query({
			query: (page) =>
				`/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`,
		}),
		getMovieById: builder.query({
			query: (id) => `/api/v2.2/films/${id}`,
		}),
	}),
});

export const {
	useGetMoviesByKeywordQuery,
	useGetTopMoviesQuery,
	useGetMovieByIdQuery,
} = apiSlice;
export default apiSlice;
