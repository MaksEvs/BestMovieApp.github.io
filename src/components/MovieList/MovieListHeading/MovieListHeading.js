import React from 'react';

const MovieListHeading = (props) => {
    return (
        <div className='movie-list-heading'>
            <h2>{props.heading}</h2>
        </div>
    );
};

export default MovieListHeading;