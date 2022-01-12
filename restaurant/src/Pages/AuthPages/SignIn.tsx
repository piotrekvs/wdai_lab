import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {}

type State = {
    email: string;
    password: string;
}

export class SignIn extends React.Component<Props, State> {
    state = {
        email: '',
        password: '',
    };

    handleInput(key: keyof State, val: string) {
        this.setState((s) => ({ ...s, [key]: val }));
    }

    render() {
        return (
            <Container>
                <Form>
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
                            value={this.state.password}
                            onChange={(val) => this.handleInput('password', val.target.value)}
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
    }
}

export default SignIn;
