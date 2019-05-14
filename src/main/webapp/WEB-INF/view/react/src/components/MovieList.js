import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MovieListItem from "./MovieListItem";

class MovieList extends Component {
    render() {
        const movies = this.props.movies.map(movie => <MovieListItem key={movie.id} movie={movie} width={this.props.width}/>);
        return (
            <div className={"mt-2"} id={"movieList"}>
                {movies}
            </div>
        );
    }
}

MovieList.propTypes = {};

export default MovieList;
