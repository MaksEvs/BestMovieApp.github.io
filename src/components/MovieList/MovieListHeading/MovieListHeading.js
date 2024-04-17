import React from 'react';

import './MovieListHeading.css'

const MovieListHeading = (props) => {
    return (
        <div className='movie-list-heading'>
            <h2>{props.heading}</h2>
        </div>
    );
};

export default MovieListHeading;