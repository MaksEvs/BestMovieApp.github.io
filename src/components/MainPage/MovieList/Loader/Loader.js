import { FaSpinner } from 'react-icons/fa';
import './Loader.css'; // Создайте файл Loader.css для стилей анимации

const Loader = () => {
    return (
        <div className="loader-container">
            <FaSpinner className="spinner" />
            <h2>Loading...</h2>
        </div>
    );
};

export default Loader;