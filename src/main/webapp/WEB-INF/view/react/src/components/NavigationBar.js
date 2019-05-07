import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import PropTypes from 'prop-types';
import * as jwtDecoder from 'jwt-decode';
import {Link} from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Rate The Movie</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {window.localStorage.getItem("jwt") !== null ? <Nav.Link href="/addMovie">Add Movie</Nav.Link> : ""}

                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {window.localStorage.getItem("jwt") !== null ? <Link to="/login">Signed in as: {jwtDecoder(window.localStorage.getItem("jwt")).sub}</Link> : <Link to="/login">Login</Link>}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavigationBar.propTypes = {};

export default NavigationBar;
