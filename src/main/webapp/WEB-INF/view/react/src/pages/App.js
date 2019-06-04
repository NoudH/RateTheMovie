import React, { Component } from 'react';
import './css/App.css';
import MovieList from "../components/MovieList";
import Axios from "axios"
import NavigationBar from "../components/NavigationBar";
import 'bootstrap/dist/css/bootstrap.css';
import GetAllMovies from "../api/GetAllMovies";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {movies: []};
  }


  componentDidMount() {
      GetAllMovies(0, 20).then( data =>
          this.setState({movies: data.content})
      );
  }

  render() {
    return (
        <div className="App">
            <NavigationBar/>
            <div className={"ml-4 mt-4"}>
                <h2>Newest/Upcoming Movies:</h2>
                <MovieList movies={this.state.movies}/>
            </div>
        </div>
    );
  }
}

export default App;
