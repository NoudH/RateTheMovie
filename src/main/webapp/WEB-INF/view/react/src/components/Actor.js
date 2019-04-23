import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StarRatings from "./Comment";

class Actor extends Component {
    render() {
        return (
            <div className={"Actor"}>
                <div className={"row ActorRow"}>
                    <div className={"col-md-2"}>
                        <img height={"100%"} src={this.props.imageUrl}/>
                    </div>
                    <div className={"col-md-10"}>
                        <p className={"mb-0 ml-1"}>{this.props.name}</p>
                    </div>
                </div>
            </div>
        );
    }
}

Actor.propTypes = {};

export default Actor;
