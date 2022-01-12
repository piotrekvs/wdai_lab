import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {}

type State = {
    email: string;
    password: string;
}

const SignIn: React.FC<Props> = () => {
    const [state, setState] = useState<State>({
        email: '',
        password: '',
    });

    const handleInput = (key: keyof State, val: string) => {
        setState((s) => ({ ...s, [key]: val }));
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={(val) => handleInput('email', val.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={(val) => handleInput('password', val.target.value)}
                    />
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Link to="/auth/signup">
                        <Button variant="outline-primary">Create account</Button>
                    </Link>
                    <Button variant="primary">Sign in</Button>
                </div>
            </Form>
        </Container>
    );
};

export default SignIn;
