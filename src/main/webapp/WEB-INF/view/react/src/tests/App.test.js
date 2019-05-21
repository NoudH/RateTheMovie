import React from 'react';
import ReactDOM from 'react-dom';
import App from '../pages/App';
import {MemoryRouter as Router, Route} from 'react-router-dom';
import ActorDetailed from "../pages/ActorDetailed";
import AddActor from "../pages/AddActor";
import AddMovie from "../pages/AddMovie";
import BrowseMovies from "../pages/BrowseMovies";
import BrowseActors from "../pages/BrowseActors";
import Login from "../pages/login";
import MovieDetailed from "../pages/MovieDetailed";
import SignUp from "../pages/SignUp";

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><App /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('ActorDetailed renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><ActorDetailed /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('AddActor renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AddActor /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('AddMovie renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AddMovie /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('BrowseMovies renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><BrowseMovies /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('BrowseActors renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><BrowseActors /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('login renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Login /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('MovieDetailed renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><MovieDetailed /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('SignUp renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><SignUp /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
