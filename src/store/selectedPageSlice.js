import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentPage: 1,
};

export const selectedPageSlice = createSlice({
	name: "selectedPage",
	initialState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
});

export const { setCurrentPage } = selectedPageSlice.actions;

export const selectCurrentPage = (state) => state.selectedPage.currentPage;

export default selectedPageSlice.reducer;
