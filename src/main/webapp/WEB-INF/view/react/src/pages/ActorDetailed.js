import React, {Component} from 'react';
import NavigationBar from "../components/NavigationBar";
import Axios from "axios";
import MovieList from "../components/MovieList";
import FindActorById from "../api/FindActorById";

class ActorDetailed extends Component {

    constructor(props) {
        super(props);
        this.state = {actor: {movies: []}}
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        FindActorById(params.get("id")).then( data => {
            this.setState({actor: data});
        })
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-md-3"}>
                            <img src={this.state.actor.imageUrl} alt={this.state.actor.name} width={"100%"}/>
                        </div>
                        <div className={"col-md-9"}>
                            <h3>{this.state.actor.name}</h3>
                            <p className={"text-left mb-0 mt-1 text-secondary"}>Age: {(new Date(new Date() - new Date(this.state.actor.dateOfBirth)).getUTCFullYear() - 1970)} </p>
                            <p className={"text-left mb-0 mt-1 text-secondary"}>Born: {new Date(this.state.actor.dateOfBirth).toDateString().replace(/^\S+\s/,'')}</p>
                            <h4 className={"mt-2"}>Description:</h4>
                            {this.state.actor.description}
                        </div>
                    </div>
                    <br/>
                    <h4>Movies:</h4>
                    <MovieList movies={this.state.actor.movies} width={"100%"}/>
                </div>
            </div>
        );
    }
}

export default ActorDetailed;
