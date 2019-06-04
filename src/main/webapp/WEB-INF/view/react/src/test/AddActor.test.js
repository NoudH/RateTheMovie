import ReactDOM from "react-dom";
import {MemoryRouter as Router} from "react-router";
import AddActor from "../pages/AddActor";
import React from "react";

it('AddActor renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><AddActor /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});