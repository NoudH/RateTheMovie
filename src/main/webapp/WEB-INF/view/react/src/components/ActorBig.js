import React, {Component} from 'react';
import StarRatings from "./MovieListItem";
import {Link} from "react-router-dom";

class ActorBig extends Component {
    render() {
        return (
            <div className={"mb-1 actor_container"}>
                <Link to={"/actor?id=" + this.props.ident} style={{color: "#212529", textDecoration: "none"}}>
                    <div className={"row"}>
                        <div id={"imageholder"} className={"col-md-3"}>
                            <img src={this.props.imageUrl} className={"img-fluid"} alt={this.props.name} style={{width: "100%"}}/>
                        </div>
                        <div id={"movieDetails"} className={"col-md-9"}>
                            <h2 className={"text-left mb-0"}>{this.props.name}</h2>
                            <p className={"text-left mb-0 mt-1 text-secondary"}>{new Date(this.props.dateOfBirth).toDateString().replace(/^\S+\s/,'') + " (" + (new Date(new Date() - new Date(this.props.dateOfBirth)).getUTCFullYear() - 1970) + ")"}</p>
                            <br/>
                            <p className={"font-weight-bold mb-0"}>Description:</p>
                            <p className={"text-left"}>{this.props.description}</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ActorBig;