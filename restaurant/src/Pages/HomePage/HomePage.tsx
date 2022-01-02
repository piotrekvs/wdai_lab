import React from 'react';
import {
    Col, Container, ListGroup, Row,
} from 'react-bootstrap';
import './HomePage.css';

const MenuPage = () => (
    <div className="container">
        <Container fluid>
            <Row className="mb-5">
                <Col>
                    <h1>Welcome to our restaurant!</h1>
                </Col>
            </Row>
            <Row>
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
                    <img
                        alt="map"
                        // eslint-disable-next-line max-len
                        src="https://k10.targeo.pl/i/cache/static/ulica/ry/krakow+31-008,rynek_glowny.png"
                    />
                </Col>
            </Row>
        </Container>
    </div>
);

export default MenuPage;
