import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';


function Movie({title, poster, genres, overview}){
    return (
        <div className="Movie">
            <div className="Movie__Column">
                <h1>{title}</h1> 
                <div className="Movie__Genres">
                    {genres.map((genre, index) => <MovieGenre genre={genre} key={index} />)}
                </div>
                <div className="Movie__Overview">
                    {overview}
                </div>
            </div>
            <div className="Movie__Column">
                <MoviePoster poster={poster}/>
            </div>
      </div>
    )
}

function MoviePoster({poster, alt}){ 
    return (
       <img alt={alt} src={poster} title={alt} className="Movie__Poster" />
    )
}

function MovieGenre({genre}){
    return(
        <span className="Movie__Genre">
            {genre}
        </span>
    )
}

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    overview : PropTypes.string.isRequired
}
    
MoviePoster.propTypes = {
        poster: PropTypes.string.isRequired
    }
    
export default Movie;