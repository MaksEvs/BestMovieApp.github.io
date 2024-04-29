import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "37c21d56-179c-4e5d-9149-af85b53e8f5f";

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
			query: (page = 1) =>
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
