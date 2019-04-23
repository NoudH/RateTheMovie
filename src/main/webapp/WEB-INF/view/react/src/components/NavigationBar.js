import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import PropTypes from 'prop-types';
import Axios from "axios";
import * as jwtDecoder from 'jwt-decode';

class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Rate The Movie</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {window.localStorage.getItem("jwt") !== undefined ? <a href="/login">Signed in as: {jwtDecoder(window.localStorage.getItem("jwt")).sub}</a> : <a href="/login">Login</a>}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavigationBar.propTypes = {};

export default NavigationBar;
