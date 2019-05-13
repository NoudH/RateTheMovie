import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MovieListItem from "./MovieListItem";

class MyComponent extends Component {
    render() {
        const movies = this.props.movies.map(movie => <MovieListItem key={movie.id} movie={movie} width={this.props.width}/>);
        return (
            <div className={"ml-4 mt-2"} id={"movieList"}>
                {movies}
            </div>
        );
    }
}

MyComponent.propTypes = {};

export default MyComponent;
