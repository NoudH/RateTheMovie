import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StarRatings from "react-star-ratings";

class Comment extends Component {
    render() {
        return (
            <div className={"comment"}>
                <p className={"mb-0 ml-1 font-weight-bold"}>{this.props.user.username} <span className={"text-secondary font-weight-normal"}>({new Date(this.props.date).toDateString()})</span></p>
                <StarRatings
                    rating={this.props.rating}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    starDimension={"20px"}/>
               {this.props.comment.split("\n").map((item)=>([
                       <p className={"ml-1"}>{item}</p>
                ]))}
            </div>
        );
    }
}

Comment.propTypes = {};

export default Comment;
