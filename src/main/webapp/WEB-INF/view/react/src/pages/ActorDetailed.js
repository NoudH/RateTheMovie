import React, {Component} from 'react';
import NavigationBar from "../components/NavigationBar";
import Axios from "axios";
import MovieListItem from "../components/MovieListItem";
import MovieList from "../components/MovieList";

class ActorDetailed extends Component {

    constructor(props) {
        super(props);
        this.state = {actor: {movies: []}}
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        Axios.get('http://localhost:8080/api/person/findById?id=' + params.get("id"))
            .then(res => {
                console.log(res);
                const data = res.data;
                this.setState({actor: data});
            });
    }
    render() {
        const movies = this.state.actor.movies.map((movie, index) => (
            <MovieListItem key={index} movie={movie} width={"100%"}/>
        ));
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