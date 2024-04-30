import React from "react";
import { BsArrowBarLeft, BsArrowBarRight, BsArrow90DegLeft } from "react-icons/bs";

const Pagination = ({
	currentPage,
	setCurrentPage,
	totalPages,
	isFetching,
}) => {
	const isLastPage = currentPage === totalPages;

	const handlePrevClick = () => {
		if (currentPage !== 1) {
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
						<button onClick={handleReturnToStart}><BsArrow90DegLeft /> В начало</button>
					</li>
				)}
				{currentPage !== 1 && (
					<li>
						<button onClick={handlePrevClick} disabled={isFetching}><BsArrowBarLeft /> Предыдущая</button>
					</li>
				)}
				<li>
    				<span className="current-page">{currentPage}</span>
				</li>
				<li className={isLastPage ? "disabled" : ""}>
					<button onClick={handleNextClick} disabled={isFetching}>Следующая <BsArrowBarRight /></button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;