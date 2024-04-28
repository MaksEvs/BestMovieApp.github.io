import { useGetMovieByIdQuery } from "../../store/apiSlice";
import Loader from "../MainPage/MovieList/Loader/Loader";
import { Link } from "react-router-dom";

const FavoriteFilmItem = ({ filmID }) => {
	const { data, error, isLoading, isFetching } = useGetMovieByIdQuery(filmID);

	console.log(filmID);
	return (
		<li className="movie-item">
			{" "}
			{isLoading ? (
				<Loader />
			) : (
				<Link to={`/film/${data.kinopoiskId}`}>
					<li className="movie-item" key={data.kinopoiskId}>
						<img src={data.posterUrlPreview} alt={data.nameRu} />
						<p className="movie-title">{data.nameRu}</p>
					</li>
				</Link>
			)}
		</li>
	);
};

export default FavoriteFilmItem;
