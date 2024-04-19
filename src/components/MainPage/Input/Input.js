import React from "react";
import "./Input.css";

const Input = ({ setSearchValue }) => {
	const onChangeInputHandler = (event) => {
		setSearchValue(event.currentTarget.value);
		console.log(event.currentTarget.value);
	};

	return (
		<input
			type="text"
			placeholder="Поиск фильмов или сериалов"
			onChange={onChangeInputHandler}
		></input>
	);
};

export default Input;
