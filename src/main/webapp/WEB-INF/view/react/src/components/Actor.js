import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Actor extends Component {
    render() {
        return (
            <div className={"Actor"}>
                <Link to={"/actor?id=" + this.props.id} style={{color: "#212529", textDecoration: "none"}}>
                    <div className={"row ActorRow"}>
                        <div className={"col-md-2"} style={{"max-height": "100%"}}>
                            <img src={this.props.imageUrl} height={"100%"}/>
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
