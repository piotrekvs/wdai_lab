import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';

type Props = {}

type State = {
    name: string;
    email: string;
    password1: string;
    password2: string;
}

export class SignUp extends React.Component<Props, State> {
    state = {
        name: '',
        email: '',
        password1: '',
        password2: '',
    };

    handleInput(key: keyof State, val: string) {
        this.setState((s) => ({ ...s, [key]: val }));
    }

    render() {
        return (
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={(val) => this.handleInput('name', val.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={(val) => this.handleInput('email', val.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={this.state.password1}
                            onChange={(val) => this.handleInput('password1', val.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repeat Password"
                            value={this.state.password2}
                            onChange={(val) => this.handleInput('password2', val.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary">Sign up</Button>
                </Form>
            </Container>
        );
    }
}

export default SignUp;
