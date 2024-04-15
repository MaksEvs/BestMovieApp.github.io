import React from 'react';
import './FilterMovies.css'

const FilterMovies = () => {
    return (
        <div className='buttons'>
            <button>All</button>
            <button>Movies</button>
            <button>TV Shows</button>
        </div>
    );
};

export default FilterMovies;