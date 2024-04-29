import React from "react";

const FavoritePagination = ({ currentPage, totalPages, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li
						key={number}
						className={
							currentPage === number ? "page-item active" : "page-item"
						}
					>
						<button onClick={() => paginate(number)} className="page-link">
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default FavoritePagination;
