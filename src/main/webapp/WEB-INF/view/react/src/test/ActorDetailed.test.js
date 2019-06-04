import ReactDOM from "react-dom";
import {MemoryRouter as Router} from "react-router";
import ActorDetailed from "../pages/ActorDetailed";
import React from "react";
import FindActorById from "../api/FindActorById";
import mockAxios from 'jest-mock-axios';

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><ActorDetailed /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should get the actor data', () => {

    let catchFn = jest.fn(),
        thenFn = jest.fn();

    FindActorById(1)
        .then(thenFn)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/persons/findById?id=1');

    let responseObj = { data: 'actor object' };
    mockAxios.mockResponse(responseObj);

    expect(thenFn).toHaveBeenCalledWith('actor object');

    expect(catchFn).not.toHaveBeenCalled();
});