import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
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
                        <Nav.Link href="/browse">Browse</Nav.Link>
                        <Nav.Link href="/browseActors">Actors</Nav.Link>
                        {window.sessionStorage.getItem("jwt") !== null ? <Nav.Link href="/addMovie">Add Movie</Nav.Link> : ""}
                        {window.sessionStorage.getItem("jwt") !== null ? jwtDecoder(window.sessionStorage.getItem("jwt")).roles.includes("ROLE_ADMIN") ? <Nav.Link href="/addActor">Add Actor</Nav.Link> : "" : ""}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {window.sessionStorage.getItem("jwt") !== null ? <Link to="/login">Signed in as: {jwtDecoder(window.sessionStorage.getItem("jwt")).sub}</Link> : <Link to="/login">Login</Link>}
                    </Navbar.Text>
                    <div className={"divider"}/>
                    <Navbar.Text>
                        {window.sessionStorage.getItem("jwt") !== null ? <a href={window.location} onClick={()=>{window.sessionStorage.removeItem("jwt")}}>Logout</a> : <Link to={"/signup"}>Signup</Link>}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;
