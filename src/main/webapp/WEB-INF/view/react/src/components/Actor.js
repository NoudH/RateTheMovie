import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Actor extends Component {
    render() {
        return (
            <div className={"Actor"}>
                <Link to={"/actor?id=" + this.props.id} style={{color: "#212529", textDecoration: "none"}}>
                    <div className={"row ActorRow"}>
                        <div className={"col-md-2"}>
                            <img height={"100%"} src={this.props.imageUrl}/>
                        </div>
                        <div className={"col-md-10"}>
                            <p className={"mb-0 ml-1"}>{this.props.name}</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Actor;
