import React from 'react';
import { Container } from 'react-bootstrap';

const ErrorPage = () => (
    <Container className="pt-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="m-5">404</h1>
        <h2>Page not found :-(</h2>
    </Container>
);

export default ErrorPage;
