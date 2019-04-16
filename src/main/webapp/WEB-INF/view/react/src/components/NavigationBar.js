import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import PropTypes from 'prop-types';

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
                        Signed in as: <a href="/login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavigationBar.propTypes = {};

export default NavigationBar;
