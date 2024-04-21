import Header from "../Header/Header";
import MovieListFetcher from "./MovieList/MovieListFetcher";
import "./MainPage.css";

const MainPage = () => {
	return (
		<div>
			<Header />

			<div className="wrapper">
			
				<MovieListFetcher />
			</div>
		</div>
	);
};

export default MainPage;
