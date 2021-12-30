import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarHeader = () => (
    <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
                <Nav.Link as={Link} to="/photos">Photos</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
);

export default NavbarHeader;
