import React, { useState } from 'react';
import {
    Button, Card, Container, Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from './AuthValidation';

type Props = {}

type State = {
    input: {
        email: string;
        password: string;
    }
    response: boolean;
}

const SignIn: React.FC<Props> = () => {
    const [input, setInput] = useState<State['input']>({
        email: '',
        password: '',
    });

    const [response, setResponse] = useState<State['response']>(false);

    const handleInput = (key: keyof State['input'], val: string) => {
        setInput((s) => ({ ...s, [key]: val }));
    };

    const handleSignIn = async () => {
        const isVaild = validateEmail(input.email)
                        && validatePassword(input.password, input.password);
        setResponse(!isVaild);
    };

    return (
        <Container className="d-flex justify-content-center">
            <Card body className="m-2">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={input.email}
                            onChange={(val) => handleInput('email', val.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={input.password}
                            onChange={(val) => handleInput('password', val.target.value)}
                        />
                    </Form.Group>
                    {response && <p className="text-danger">Wrong email or password.</p>}
                    <div className="d-flex justify-content-between">
                        <Link to="/auth/signup">
                            <Button variant="outline-primary">Create account</Button>
                        </Link>
                        <Button
                            variant="primary"
                            onClick={handleSignIn}
                        >
                            Sign in
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default SignIn;
