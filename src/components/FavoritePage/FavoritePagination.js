// FavoritePagination.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/favoriteSlice";
import './FavoritePagination.css';

const FavoritePagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.favorite.currentPage);

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    localStorage.setItem("currentPageFavorites", pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
	pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="favorite-pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? "favoritePage-item active" : "favoritePage-item"}
          >
            <button onClick={() => paginate(number)} className="favoritePage-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FavoritePagination;
