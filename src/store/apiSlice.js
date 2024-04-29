import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "be9f6d65-d4ac-468a-bb70-97ac247c7cfe";

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
		getMovieByRandom: builder.query({
			query: (page) =>
				`api/v2.2/films?order=RATING&type=FILM&ratingFrom=7&ratingTo=10&yearFrom=2015&yearTo=2024&page=${page}`,
		}),
	}),
});

export const {
	useGetMoviesByKeywordQuery,
	useGetTopMoviesQuery,
	useGetMovieByIdQuery,
	useGetMovieByRandomQuery,
} = apiSlice;
export default apiSlice;
