import ReactDOM from "react-dom";
import {MemoryRouter as Router} from "react-router";
import React from "react";
import BrowseActors from "../pages/BrowseActors";
import mockAxios from "jest-mock-axios";
import BrowseForMovies from "../api/BrowseForMovies";
import GetAllActors from "../api/GetAllActors";
import FindActorById from "../api/FindActorById";
import FindActorByName from "../api/FindActorByName";

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

it('BrowseActors renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><BrowseActors /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should get the actor data', () => {

    let catchFn = jest.fn(),
        thenFn = jest.fn();

    let page = 0, size = 20;
    GetAllActors(page, size)
        .then(thenFn)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/persons/?page=' + page  + '&size=' + size);

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
