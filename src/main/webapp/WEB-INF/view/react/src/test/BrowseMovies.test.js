import ReactDOM from "react-dom";
import {MemoryRouter as Router} from "react-router";
import React from "react";
import BrowseMovies from "../pages/BrowseMovies";
import mockAxios from "jest-mock-axios";
import GetAllMovies from "../api/GetAllMovies";
import BrowseForMovies from "../api/BrowseForMovies";

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

it('BrowseMovies renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><BrowseMovies /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should get the movie data', () => {

    let catchFn = jest.fn(),
        thenFn = jest.fn();

    let page = 0, size = 20;
    GetAllMovies(page, size)
        .then(thenFn)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/movie/all?page=' + page + '&size=' + size);

    let responseObj = { data: {content: 'movie object'} };
    mockAxios.mockResponse(responseObj);

    expect(thenFn).toHaveBeenCalledWith({content: 'movie object'});

    expect(catchFn).not.toHaveBeenCalled();
});

it('should get the movie data from browse endpoint', () => {

    let catchFn = jest.fn(),
        thenFn = jest.fn();

    let page = 0,
        size = 20,
        title = "title",
        rating = 5,
        year = 2019,
        genre = "WAR";
    BrowseForMovies(title, rating, year, genre, page, size)
        .then(thenFn)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/movie/browse?page=' + page + '&size=' + size + '&title='+ title + "&rating=" + rating + "&year=" + year + "&genre=" + genre);

    let responseObj = { data: 'movie object' };
    mockAxios.mockResponse(responseObj);

    expect(thenFn).toHaveBeenCalledWith('movie object');

    expect(catchFn).not.toHaveBeenCalled();
});
