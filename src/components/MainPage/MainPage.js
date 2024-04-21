import Header from "../Header/Header";
import MovieListFetcher from "./MovieList/MovieListFetcher";
import "./MainPage.css";

const MainPage = () => {
	return (
		<div>
			<Header />

			<div className="wrapper">
			<h2>Открой для себя мир кино</h2>
				<MovieListFetcher />
			</div>
		</div>
	);
};

export default MainPage;
