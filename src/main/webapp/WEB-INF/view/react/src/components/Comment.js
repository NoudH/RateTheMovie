import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StarRatings from "react-star-ratings";

class Comment extends Component {
    render() {
        return (
            <div className={"comment"}>
                <p className={"mb-0 ml-1"}>{this.props.user.username} <span className={"text-secondary"}>({new Date(this.props.date).toDateString()})</span></p>
                <StarRatings
                    rating={this.props.rating}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    starDimension={"20px"}/>
                <p className={"ml-1 mb-0"}>{this.props.comment}</p>
            </div>
        );
    }
}

Comment.propTypes = {};

export default Comment;
