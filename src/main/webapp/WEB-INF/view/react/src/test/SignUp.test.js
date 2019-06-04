import ReactDOM from "react-dom";
import {MemoryRouter as Router} from "react-router";
import React from "react";
import SignUp from "../pages/SignUp";

it('SignUp renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><SignUp /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});