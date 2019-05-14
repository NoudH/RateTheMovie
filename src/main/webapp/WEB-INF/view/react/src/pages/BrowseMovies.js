import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NavigationBar from "../components/NavigationBar";
import MovieList from "../components/MovieList";
import "./css/BrowseMovies.css"
import Axios from "axios";

class BrowseMovies extends Component {

    constructor(props) {
        super(props);
        this.state = {title: "", releaseYear: 0, movies: [], genres: [], rating: 0, genre: "", showFilters: false}
    }

    componentDidMount() {
        Axios.get('http://localhost:8080/api/movie/all?page=0&size=20')
            .then(res => {
                console.log(res);
                const movieData = res.data.content;
                this.setState({movies: movieData});
            });

        Axios.get('http://localhost:8080/api/genre')
            .then(res => {
                console.log(res);
                const data = res.data;
                this.setState({genres: data});
            });
    }

    browseMovies(){
        Axios.get('http://localhost:8080/api/movie/browse?page=0&size=20&title='+ this.state.title + "&rating=" + this.state.rating + "&year=" + this.state.releaseYear + "&genre=" + this.state.genre)
            .then(res => {
                console.log(res);
                const data = res.data.content;
                this.setState({movies: data});
            });
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className={"container"}>
                    <h2>Browse Movies:</h2>
                    <input type={"text"} className={"bg-white"} id={"title"} name={"title"} placeholder={"Search"} onChange={(event)=> {
                        this.setState({title: event.target.value}, () => this.browseMovies());
                    }}/>
                    <div className={this.state.showFilters ? "" : ""} id={this.state.showFilters ? "filter-form-down" : "filter-form-up"} >
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <h4>Genre:</h4>
                                <select className="form-control mt-2" id="genres" onChange={(event) => {
                                    this.setState({genre: event.target.value}, () => this.browseMovies());
                                }}>
                                    <option value={""}>none</option>
                                    {
                                        this.state.genres.map(
                                            ({genre}, index) => (
                                                <option key={index} value={genre}>{genre.toLowerCase()}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                            <div className={"col-md-6"}>
                                <h4>Release Year:</h4>
                                <select className="form-control mt-2" id="year" onChange={(event) => {
                                    this.setState({releaseYear: event.target.value}, () => this.browseMovies());
                                }}>
                                    <option value={""}>none</option>
                                    {
                                        [...Array(new Date().getFullYear() - 1899)].map(
                                            (x, index) => (
                                                <option key={index} value={new Date().getFullYear() - index}>{new Date().getFullYear() - index}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className={"row mt-2"}>
                            <div className={"col-md-6"}>
                                <h4>Rating:</h4>
                                <input type={"number"} className={"bg-white"} placeholder={"Rating"} min={0} max={5} step={0.1} onChange={(event) => {
                                    this.setState({rating: event.target.value}, () => this.browseMovies());
                                }}/>
                            </div>
                        </div>
                    </div>
                    <button className={"btn btn-link"} onClick={() => this.setState({showFilters: !this.state.showFilters})}><i className={this.state.showFilters ? "arrow-up" :"arrow-down"}/> {this.state.showFilters ? "Close options" : "Show more options"}</button>
                    <hr/>
                    <MovieList movies={this.state.movies} width={"100%"}/>
                </div>
            </div>
        );
    }
}

BrowseMovies.propTypes = {};

export default BrowseMovies;
