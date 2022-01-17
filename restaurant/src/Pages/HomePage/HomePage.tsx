/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable max-len */
import React from 'react';
import {
    Col, Container, ListGroup, Row,
} from 'react-bootstrap';

const MenuPage = () => (
    <Container className="d-grid">
        <Row className="mb-5">
            <Col>
                <h1>Welcome to our restaurant!</h1>
            </Col>
        </Row>
        <Row xs={1} sm={1} md={2}>
            <Col>
                <h2>Kontakt:</h2>
                <ListGroup variant="flush">
                    <ListGroup.Item>Nr 000-000-000</ListGroup.Item>
                    <ListGroup.Item>E-mail: restauracja@example.com</ListGroup.Item>
                    <ListGroup.Item>Adress: Rynek Główny 00/00</ListGroup.Item>
                    <ListGroup.Item>City: Krakow</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col>
                <iframe width="100%" height="400px" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Rynek%20G%C5%82%C3%B3wny%201,%2031-042%20Krak%C3%B3w+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" />
            </Col>
        </Row>
    </Container>
);

export default MenuPage;
