import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from "./App";
import Login from "./login";
import MovieDetailed from "./components/MovieDetailed";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Router>
        <Route path="/" exact component={App}/>
        <Route path="/index" component={App} />
        <Route path="/login" component={Login}/>
        <Route path="/movie" component={MovieDetailed} />
    </Router>,
    document.getElementById('root')
);