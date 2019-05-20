import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MovieListItem from "./MovieListItem";

class MovieList extends Component {
    render() {
        const movies = this.props.movies.map(movie => <MovieListItem key={movie.id} movie={movie}/>);
        return (
            <div className={"mt-2"} id={"movieList"} style={{width: this.props.width}}>
                {movies}
            </div>
        );
    }
}

MovieList.propTypes = {};

export default MovieList;
