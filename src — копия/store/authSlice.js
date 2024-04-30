import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	username: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			state.isLoggedIn = true;
			state.username = action.payload.username;
		},
		logout(state) {
			state.isLoggedIn = false;
			state.username = "";
		},
		register(state, action) {
			state.isLoggedIn = true;
			state.username = action.payload.username;
		},
	},
});

export const { login, logout, register } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
