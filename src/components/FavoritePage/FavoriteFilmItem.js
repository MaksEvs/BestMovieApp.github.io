import { useGetMovieByIdQuery } from "../../store/apiSlice";
import Loader from "../MainPage/MovieList/Loader/Loader";
import { Link } from "react-router-dom";
import "./FavoriteFilmItem.css";

const FavoriteFilmItem = ({ filmID }) => {
	const { data, isLoading } = useGetMovieByIdQuery(filmID);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Link to={`/film/${data.kinopoiskId}`}>
					<li className="favorite-item" key={data.kinopoiskId}>
						<img
							className="favorite-img"
							src={data.posterUrlPreview}
							alt={data.nameRu}
						/>
						<p className="favorite-title">{data.nameRu}</p>
					</li>
				</Link>
			)}
		</>
	);
};

export default FavoriteFilmItem;
