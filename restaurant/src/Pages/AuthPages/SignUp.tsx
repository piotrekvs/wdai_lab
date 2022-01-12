import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

type Props = {}

type State = {
    name: string;
    email: string;
    password1: string;
    password2: string;
}

const SignUp: React.FC<Props> = () => {
    const [state, setState] = useState<State>({
        name: '',
        email: '',
        password1: '',
        password2: '',
    });

    const handleInput = (key: keyof State, val: string) => {
        setState((s) => ({ ...s, [key]: val }));
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        value={state.name}
                        onChange={(val) => handleInput('name', val.target.value)}
                    />
                </Form.Group>

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
                        value={state.password1}
                        onChange={(val) => handleInput('password1', val.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repeat Password"
                        value={state.password2}
                        onChange={(val) => handleInput('password2', val.target.value)}
                    />
                </Form.Group>
                <Button variant="primary">Sign up</Button>
            </Form>
        </Container>
    );
};

export default SignUp;
