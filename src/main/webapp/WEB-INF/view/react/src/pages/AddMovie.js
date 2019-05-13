import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./css/AddMovie.css"
import NavigationBar from "../components/NavigationBar";
import Axios from "axios";

class AddMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {actorData: [], actors: [], genres: [], tags: [], title: "", releaseYear: 0, description: "", trailerUrl: "", imageUrl: ""}
    }

    componentDidMount() {
        Axios.get('http://localhost:8080/api/person/?page=0&size=20')
            .then(res => {
                console.log(res);
                const data = res.data.content;
                this.setState({actorData: data});
            });

        Axios.get('http://localhost:8080/api/genre')
            .then(res => {
                console.log(res);
                const data = res.data;
                this.setState({genres: data});
            });
    }

    findActorByName = (event) => {
        Axios.get('http://localhost:8080/api/person/searchByName?name=' + event.target.value + '&page=0&size=20')
            .then(res => {
                console.log(res);
                const data = res.data.content;
                this.setState({actorData: data});
            });
    };

    addTag = (event) => {
        const oldTags = this.state.tags;
        this.setState({tags: oldTags.concat(this.state.genres[parseInt(event.target.value)])})
    };

    removeTag = (index) => {
        const oldTags = this.state.tags;
        oldTags.splice(index, 1);
        this.setState({tags: oldTags})
    };

    addActor(index){
        const old = this.state.actors;
        this.setState({actors : old.concat(this.state.actorData[index])})
    }

    removeActor(index){
        const old = this.state.actors;
        old.splice(index, 1);
        this.setState({actors : old})
    }

    postMovie = () => {
        Axios.post('http://localhost:8080/api/movie/', {
            title: this.state.title,
            releaseYear: this.state.releaseYear,
            trailerUrl: this.state.trailerUrl,
            imageUrl: this.state.imageUrl,
            description: this.state.description,
            actors: this.state.actors,
            genres: this.state.genres
        }, {
            headers: {
                Authorization: "Bearer " + window.sessionStorage.getItem("jwt")
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className={"container"}>
                    <span className={"h1"}>Add a movie</span>
                    <button className={"btn btn-primary float-right"} onClick={this.postMovie}>Save</button>

                    <input type={"text"} placeholder={"Title"} name={"title"} id={"title"} onChange={(event) => {this.setState({title: event.target.value})}}/>
                    <input type={"number"} className={"text-secondary"} placeholder={"Release Year"} name={"releaseYear"}
                           id={"releaseYear"} onChange={(event) => {this.setState({releaseYear: parseInt(event.target.value)})}}/>

                    <h4>Genres:</h4>
                    {
                        this.state.tags.map(
                            ({genre}, index) => (
                                <span className={"tag"} key={index}>{genre} <span className={"close"} onClick={() => this.removeTag(index)}>x</span></span>
                            )
                        )
                    }
                    <select className="form-control mt-2" id="genres" onChange={this.addTag}>
                        {
                            this.state.genres.map(
                                ({genre}, index) => (
                                    <option key={index} value={index}>{genre.toLowerCase()}</option>
                                )
                            )
                        }
                    </select>

                    <h4 className={"mt-3"}>Media:</h4>
                    <h5>Image:</h5>
                    <input type={"text"} placeholder={"Image URL"} name={"imageUrl"} id={"imageUrl"} onChange={(event) => {this.setState({imageUrl: event.target.value})}}/>
                    <h5>Trailer:</h5>
                    <input type={"text"} placeholder={"Trailer URL"} name={"trailerUrl"} id={"trailerUrl"} onChange={(event) => {this.setState({trailerUrl: event.target.value})}}/>

                    <h4 className={"mt-3"}>Description:</h4>
                    <textarea placeholder={"Description"} onChange={(event) => {this.setState({description: event.target.value})}}/>

                    <h4 className={"mt-3"}>Actors:</h4>
                    <input type={"text"} placeholder={"Search"} onChange={this.findActorByName}/>
                    {
                        this.state.actorData.map(
                            ({id, dateOfBirth, description, employmentJob, imageUrl, name}, index) => (
                                <div className={"Actor"} id={index} key={index}>
                                    <div className={"row ActorRow"}>
                                        <div className={"col-md-2"}>
                                            <img height={"100%"} src={imageUrl}/>
                                        </div>
                                        <div className={"col-md-8"}>
                                            <p className={"mb-0 ml-1"}>{name}</p>
                                        </div>
                                        <div className={"col-md-2"}>
                                            <button className={"btn btn-primary"} onClick={() => this.addActor(index)}>select</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                    <br/>
                    <h5 className={"mt-3"}>Selected:</h5>
                    {
                        this.state.actors.map(
                            ({id, dateOfBirth, description, employmentJob, imageUrl, name}, index) => (
                                <div className={"Actor"} id={index} key={index}>
                                    <div className={"row ActorRow"}>
                                        <div className={"col-md-2"}>
                                            <img height={"100%"} src={imageUrl}/>
                                        </div>
                                        <div className={"col-md-8"}>
                                            <p className={"mb-0 ml-1"}>{name}</p>
                                        </div>
                                        <div className={"col-md-2"}>
                                            <button className={"btn btn-danger"} onClick={() => this.removeActor(index)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}

AddMovie.propTypes = {};

export default AddMovie;
