import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieList from "./components/MovieList";
import Axios from "axios"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {movies: []};
  }


  componentDidMount() {
    Axios.get('http://localhost:8080/api/movie/all?page=0&size=20')
        .then(res => {
            console.log(res);
            const movieData = res.data.content;
            this.setState({ movies: movieData });
        });
  }

  render() {
    return (
      <div className="App">
        <MovieList movies={this.state.movies}/>
      </div>
    );
  }
}

export default App;
