import React, {Component} from 'react';
import "./css/AddMovie.css"
import NavigationBar from "../components/NavigationBar";
import Axios from "axios";
import PageControls from "../components/PageControls";
import FindActorByName from "../api/FindActorByName";
import GetAllActors from "../api/GetAllActors";
import GetAllGenres from "../api/GetAllGenres";

class AddMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {actorData: [], actors: [], genres: [], tags: [], title: "", releaseYear: 0, description: "", trailerUrl: "", imageUrl: "", movieGenres: [], page: 1, lastPage: 1, name: ""}
    }

    componentDidMount() {
        GetAllActors(0, 10)
            .then(data => {
                this.setState({actorData: data.content, lastPage: data.totalPages});
            });

        GetAllGenres()
            .then(data => {
                this.setState({genres: data});
            });
    }

    findActorByName = () => {
        FindActorByName(this.state.name, this.state.page - 1, 10)
            .then(data => {
                this.setState({actorData: data.content, lastPage: data.totalPages});
            });
    };

    setPage = (pagenr) => {
        this.setState({page: pagenr}, () => this.findActorByName())
    };

    addTag = (event) => {
        const oldTags = this.state.tags;
        const oldGenres = this.state.movieGenres;
        this.setState({tags: oldTags.concat(this.state.genres[parseInt(event.target.value)])});
        this.setState({movieGenres: oldGenres.concat(this.state.genres[parseInt(event.target.value)])});
    };

    removeTag = (index) => {
        const oldTags = this.state.tags;
        oldTags.splice(index, 1);

        const oldGenres = this.state.movieGenres;
        oldGenres.splice(index, 1);

        this.setState({tags: oldTags});
        this.setState({movieGenres: oldGenres});
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
        Axios.post('http://localhost:8080/api/movies/', {
            title: this.state.title,
            releaseYear: this.state.releaseYear,
            trailerUrl: this.state.trailerUrl,
            imageUrl: this.state.imageUrl,
            description: this.state.description,
            actors: this.state.actors,
            genres: this.state.movieGenres
        }, {
            headers: {
                Authorization: "Bearer " + window.sessionStorage.getItem("jwt")
            }
        })
            .then(function (response) {
                console.log(response);
                if(response.data === 200){
                    window.location = "/addMovie";
                }
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
                    <input type={"text"} placeholder={"Search"} onChange={(event) => this.setState({page: 1, name: event.target.value}, () => this.findActorByName())}/>
                    <PageControls page={this.state.page} lastPage={this.state.lastPage} onChange={(pagenr) => this.setPage(pagenr)}/>
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
                    <PageControls page={this.state.page} lastPage={this.state.lastPage} onChange={(pagenr) => this.setPage(pagenr)}/>
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

export default AddMovie;
