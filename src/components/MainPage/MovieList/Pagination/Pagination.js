import React from "react";

const Pagination = ({
	currentPage,
	setCurrentPage,
	totalPages,
	isFetching,
}) => {
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === totalPages;

	const handlePrevClick = () => {
		if (!isFirstPage) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	const handleNextClick = () => {
		if (!isLastPage) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const handleReturnToStart = () => {
		setCurrentPage(1);
	};

	return (
		<nav>
			<ul className="pagination">
				{currentPage > 2 && (
					<li>
						<button onClick={handleReturnToStart}>В начало</button>
					</li>
				)}
				<li className={isFirstPage ? "disabled" : ""}>
					<button onClick={handlePrevClick} disabled={isFetching}>
						Назад
					</button>
				</li>
				<li>
					<span> {currentPage}</span>
				</li>
				<li className={isLastPage ? "disabled" : ""}>
					<button onClick={handleNextClick} disabled={isFetching}>
						Вперед
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
