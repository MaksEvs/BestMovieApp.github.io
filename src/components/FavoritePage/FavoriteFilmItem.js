import { useGetMovieByIdQuery } from "../../store/apiSlice";
import Loader from "../MainPage/MovieList/Loader/Loader";
import { Link } from "react-router-dom";
import "./FavoriteFilmItem.css";

const FavoriteFilmItem = ({ filmID }) => {
	const { data, error, isLoading, isFetching } = useGetMovieByIdQuery(filmID);

	return (
		<li className="favorite-item">
			{" "}
			{isLoading ? (
				<Loader />
			) : (
				<Link to={`/film/${data.kinopoiskId}`}>
					<img
						className="favorite-img"
						src={data.posterUrlPreview}
						alt={data.nameRu}
					/>
					<p className="favorite-title">{data.nameRu}</p>
				</Link>
			)}
		</li>
	);
};

export default FavoriteFilmItem;
