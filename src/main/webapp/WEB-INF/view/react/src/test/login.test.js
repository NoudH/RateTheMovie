import ReactDOM from "react-dom";
import {MemoryRouter as Router} from "react-router";
import React from "react";
import Login from "../pages/login";
import mockAxios from "jest-mock-axios";

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

it('login renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Login /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});