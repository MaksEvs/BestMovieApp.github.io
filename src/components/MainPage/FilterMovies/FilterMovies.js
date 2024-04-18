import React from 'react';
import './FilterMovies.css'

const FilterMovies = () => {
    return (
        <div className='buttons'>
            <button>Всё</button>
            <button>Фильмы</button>
            <button>Сериалы</button>
        </div>
    );
};

export default FilterMovies;