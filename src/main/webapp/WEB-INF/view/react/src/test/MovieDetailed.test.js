import ReactDOM from "react-dom";
import {MemoryRouter as Router} from "react-router";
import React from "react";
import MovieDetailed from "../pages/MovieDetailed";
import mockAxios from "jest-mock-axios";
import FindMovieById from "../api/FindMovieById";

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

it('MovieDetailed renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><MovieDetailed /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should get the movie data', () => {

    let catchFn = jest.fn(),
        thenFn = jest.fn();

    FindMovieById(1)
        .then(thenFn)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/movie/?id=1');

    let responseObj = { data: 'movie object' };
    mockAxios.mockResponse(responseObj);

    expect(thenFn).toHaveBeenCalledWith('movie object');

    expect(catchFn).not.toHaveBeenCalled();
});