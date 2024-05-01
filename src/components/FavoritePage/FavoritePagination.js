import React from "react";
import './FavoritePagination.css';

const FavoritePagination = ({ currentPage, totalPages, paginate }) => {
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
						className={
							currentPage === number
								? "favoritePage-item active"
								: "favoritePage-item"
						}
					>
						<button
							onClick={() => paginate(number)}
							className="favoritePage-link"
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default FavoritePagination;