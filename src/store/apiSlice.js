import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "3fc2842c-a40f-463a-806b-531db07f0746";
// Юра
// 1 3fc2842c-a40f-463a-806b-531db07f0746
// 2 5cb2c529-2c32-4ec9-8ff8-a488a598b672
// 3 be9f6d65-d4ac-468a-bb70-97ac247c7cfe
// 4 26b2da02-8cea-4776-8b65-5978921b2c03

// Паша
// 5 9f23075d-6761-46d1-ac4c-abbe40c01461
// 6 856ce99d-9d55-4fd7-8142-2dbe9b3f499f

// Максим
// 7 60d88c1c-9dd4-447c-a020-cbd9ef01e010
// 8 37c21d56-179c-4e5d-9149-af85b53e8f5f


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
