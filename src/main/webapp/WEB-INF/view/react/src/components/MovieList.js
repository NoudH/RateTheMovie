import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MovieListItem from "./MovieListItem";

class MyComponent extends Component {
    render() {
        const movies = this.props.movies.map(movie => <MovieListItem movie={movie}/>);
        return (
            <div>
                {movies}
            </div>
        );
    }
}

MyComponent.propTypes = {};

export default MyComponent;
