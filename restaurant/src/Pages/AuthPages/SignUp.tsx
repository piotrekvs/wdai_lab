import axios from 'axios';
import React, { useState } from 'react';
import {
    Button, Card, Container, Form,
} from 'react-bootstrap';
import { validateEmail, validateName, validatePassword } from './AuthValidation';

type Props = {};

type State = {
    input: {
        name: string;
        email: string;
        password1: string;
        password2: string;
    };
    isValid: {
        name: boolean;
        email: boolean;
        password: boolean;
    };
    response: boolean;
};

const addNewUser = (user: State['input']) => axios({
    url: '/restaurant_wdai/auth/signup',
    method: 'post',
    data: user,
});

const SignUp: React.FC<Props> = () => {
    const [input, setInput] = useState<State['input']>({
        name: '',
        email: '',
        password1: '',
        password2: '',
    });

    const [isValid, setIsValid] = useState<State['isValid']>({
        name: true,
        email: true,
        password: true,
    });

    const [response, setResponse] = useState<State['response']>(false);

    const handleInput = (key: keyof State['input'], val: string) => {
        setInput((s) => ({ ...s, [key]: val }));
    };

    const handleSignUp = async () => {
        const valid = {
            name: validateName(input.name),
            email: validateEmail(input.email),
            password: validatePassword(input.password1, input.password2),
        };
        setIsValid(valid);
        if (!Object.values(valid).includes(false)) {
            // const res = await addNewUser(input);
            setResponse(true);
        }
    };

    return (
        <Container className="d-flex justify-content-center">
            <Card body className="m-2">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            isInvalid={!isValid.name}
                            value={input.name}
                            onChange={(val) => handleInput('name', val.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            isInvalid={!isValid.email}
                            value={input.email}
                            onChange={(val) => handleInput('email', val.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password (min 8 characters)</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            isInvalid={!isValid.password}
                            value={input.password1}
                            onChange={(val) => handleInput('password1', val.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repeat Password"
                            isInvalid={!isValid.password}
                            value={input.password2}
                            onChange={(val) => handleInput('password2', val.target.value)}
                        />
                    </Form.Group>
                    {response && <p className="text-danger">Username or email is already taken.</p>}
                    <Button
                        variant="primary"
                        onClick={handleSignUp}
                    >
                        Sign up
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default SignUp;
