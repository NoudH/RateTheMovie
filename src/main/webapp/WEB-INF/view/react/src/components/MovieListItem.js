import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings'

class MovieListItem extends Component {
    render() {
        return (
            <div className={"movieContainer"}>
                <div className={"row"}>
                    <div id={"imageholder"} className={"col-md-4"}>
                        <img src={this.props.movie.imageUrl} className={"img-fluid"} alt={this.props.movie.title}/>
                    </div>
                    <div id={"movieDetails"} className={"col-md-6"}>
                        <h2 className={"text-left mb-0"}>{this.props.movie.title}</h2>
                        <StarRatings
                            rating={this.props.movie.reviews.flatMap(review => review.rating).reduce((a,b) => a + b, 0) / this.props.movie.reviews.length}
                            starRatedColor="yellow"
                            numberOfStars={5} starDimension={"20px"}
                        />
                        <p className={"text-left mb-0 mt-1 text-secondary"}>{this.props.movie.releaseYear}</p>
                        {this.props.movie.genres.map((genre, i) => {return (<span className={"float-left"} key={i}>{genre.genre} </span>)})}
                        <br/>
                        <br/>
                        <p className={"font-weight-bold mb-0"}>Description:</p>
                        <p className={"text-left"}>{this.props.movie.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

MovieListItem.propTypes = {};

export default MovieListItem;
