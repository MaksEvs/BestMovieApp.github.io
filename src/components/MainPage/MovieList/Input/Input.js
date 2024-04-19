import React, { useState } from "react";
import './Input.css'

const Input = ({ setFilteredMovies }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTerm(searchText);
    filterMovies(searchText);
  };

  const filterMovies = async (searchText) => {
    try {
      const url = `http://www.omdbapi.com/?s=${searchText}&apikey=263d22d8`;
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search) {
        setFilteredMovies(responseJson.Search);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
  
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Поиск фильмов"
      />

  );
};

export default Input;