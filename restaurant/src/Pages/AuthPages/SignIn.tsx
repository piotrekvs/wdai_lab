import axios from 'axios';
import React, { useState } from 'react';
import {
    Button, Card, Container, Form,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/AuthContext';
import { validateEmail, validatePassword } from './AuthValidation';

type Props = {}

type State = {
    input: {
        email: string;
        password: string;
    }
    response: boolean;
}

const authorizeAccount = (input: State['input']) => axios({
    url: '/restaurant_wdai/auth/signin',
    method: 'post',
    data: input,
});

const SignIn: React.FC<Props> = () => {
    const navigate = useNavigate();
    const authContext = useAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const location = useLocation() as any;
    const from = location.state?.from?.pathname || '/home';

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
        if (isVaild) {
            try {
                const res = await authorizeAccount(input);
                authContext.signIn(res.data.token, () => navigate(from, { replace: true }));
            } catch (e) {
                setResponse(true);
            }
        }
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
