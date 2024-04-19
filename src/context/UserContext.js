import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		username: localStorage.getItem("username") || "",
		isLoggedIn: !!localStorage.getItem("username"),
	});

	const login = (username) => {
		localStorage.setItem("username", username);
		setUser({ username, isLoggedIn: true });
	};

	const logout = () => {
		localStorage.removeItem("username");
		setUser({ username: "", isLoggedIn: false });
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};
