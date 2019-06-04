import ReactDOM from "react-dom";
import {MemoryRouter as Router} from "react-router";
import React from "react";
import AddMovie from "../pages/AddMovie";

it('AddMovie renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><AddMovie /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});