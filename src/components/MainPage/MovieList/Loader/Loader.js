import { FaSpinner } from "react-icons/fa";
import "./Loader.css";

const Loader = () => {
	return (
		<div className="loader-container">
			<FaSpinner className="spinner" />
			<h2>Loading...</h2>
		</div>
	);
};

export default Loader;
