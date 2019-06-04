import React from 'react';
import ReactDOM from 'react-dom';
import App from '../pages/App';
import {MemoryRouter as Router, Route} from 'react-router-dom';
import mockAxios from "jest-mock-axios";
import GetAllMovies from "../api/GetAllMovies";

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><App /></Router>, div);
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
