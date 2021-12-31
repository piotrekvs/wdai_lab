import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarHeader = () => (
    <Navbar className="justify-content-center" bg="dark" variant="dark" fixed="top">
        <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
            <Nav.Link as={Link} to="/photos">Photos</Nav.Link>
        </Nav>
    </Navbar>
);

export default NavbarHeader;
