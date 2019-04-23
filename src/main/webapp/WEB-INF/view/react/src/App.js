import React, { Component } from 'react';
import './App.css';
import MovieList from "./components/MovieList";
import Axios from "axios"
import NavigationBar from "./components/NavigationBar";
import 'bootstrap/dist/css/bootstrap.css';

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
            <NavigationBar/>
            <MovieList movies={this.state.movies}/>
        </div>
    );
  }
}

export default App;
