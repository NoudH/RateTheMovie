import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from "./pages/App";
import Login from "./pages/login";
import MovieDetailed from "./pages/MovieDetailed";
import 'bootstrap/dist/css/bootstrap.css';
import AddMovie from "./pages/AddMovie";
import * as jwtDecoder from "jwt-decode";
import AddActor from "./pages/AddActor";
import BrowseMovies from "./pages/BrowseMovies";
import SignUp from "./pages/SignUp";
import BrowseActors from "./pages/BrowseActors";
import ActorDetailed from "./pages/ActorDetailed";

function isAuth(Role){
    return window.sessionStorage.getItem("jwt") !== null &&
            (jwtDecoder(window.sessionStorage.getItem("jwt")).roles.includes(Role) ||
            jwtDecoder(window.sessionStorage.getItem("jwt")).roles.includes("ROLE_ADMIN"))
}

ReactDOM.render(
    <Router>
        <Route path="/" exact component={App}/>
        <Route path="/index" component={App} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/actor" component={ActorDetailed}/>
        <Route path="/browse" component={BrowseMovies}/>
        <Route path="/browseActors" component={BrowseActors}/>
        <Route path="/movie" component={MovieDetailed} />
        <Route path="/addMovie" component={isAuth("ROLE_USER") ? AddMovie : Login }/>
        <Route path="/addActor" component={isAuth() ? AddActor : Login}/>
    </Router>,
    document.getElementById('root')
);