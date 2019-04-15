import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MovieListItem extends Component {
    render() {
        return (
            <div id={"wrapper"}>
                <div id={"imageholder"}>
                    <img src={this.props.movie.image}/>
                </div>
                <div id={"movieDetails"}>
                    
                </div>
            </div>
        );
    }
}

MovieListItem.propTypes = {};

export default MovieListItem;
