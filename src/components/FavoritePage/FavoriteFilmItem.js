import { useGetMovieByIdQuery } from "../../store/apiSlice";
import Loader from "../MainPage/MovieList/Loader/Loader";
import { Link } from "react-router-dom";
import './FavoriteFilmItem.css'

const FavoriteFilmItem = ({ filmID }) => {
	const { data, error, isLoading, isFetching } = useGetMovieByIdQuery(filmID);

	console.log(filmID);
	return (
		<li className= 'favorite-link'>
			{" "}
			{isLoading ? (
				<Loader />
			) : (
				<Link to={`/film/${data.kinopoiskId}`}>
					<li className="favorite-item" key={data.kinopoiskId}>
						<img className="favorite-img" src={data.posterUrlPreview} alt={data.nameRu} />
						<p className="favorite-title">{data.nameRu}</p>
					</li>
				</Link>
			)}
		</li>
	);
};

export default FavoriteFilmItem;
