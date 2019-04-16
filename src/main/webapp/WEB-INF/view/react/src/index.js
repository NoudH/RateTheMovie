import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from "./App";
import Login from "./login";

ReactDOM.render(
    <Router>
        <Route path="/" exact component={App}/>
        <Route path="/index" component={App} />
        <Route path="/login" component={Login} />
    </Router>,
    document.getElementById('root')
);