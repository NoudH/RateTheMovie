import ReactDOM from "react-dom";
import {MemoryRouter as Router} from "react-router";
import React from "react";
import AddMovie from "../pages/AddMovie";
import FindActorByName from "../api/FindActorByName";
import mockAxios from "jest-mock-axios";
import GetAllMovies from "../api/GetAllMovies";

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});


it('AddMovie renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><AddMovie /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should get the movie data', () => {

    let catchFn = jest.fn(),
        thenFn = jest.fn();

    let page = 0, size = 20;
    GetAllMovies(page, size)
        .then(thenFn)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/movies/all?page=' + page + '&size=' + size);

    let responseObj = { data: {content: 'movie object'} };
    mockAxios.mockResponse(responseObj);

    expect(thenFn).toHaveBeenCalledWith({content: 'movie object'});

    expect(catchFn).not.toHaveBeenCalled();
});

it('should get the actor data with name', () => {

    let catchFn = jest.fn(),
        thenFn = jest.fn();

    let page = 0,
        size = 20,
        name = "name";
    FindActorByName(name, page, size)
        .then(thenFn)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/persons/findByName?name=' + name + "&page=" + page + "&size=" + size);

    let responseObj = { data: 'movie object' };
    mockAxios.mockResponse(responseObj);

    expect(thenFn).toHaveBeenCalledWith('movie object');

    expect(catchFn).not.toHaveBeenCalled();
});