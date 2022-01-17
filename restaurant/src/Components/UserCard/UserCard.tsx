/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useState } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { User, UserManagement } from '../../Types/Types';

const modifyUser = (
    email: User['email'],
    isBanned: User['isBanned'],
    loggedInAs: User['loggedInAs'],
) => axios({
    url: '/restaurant_wdai/auth/modify',
    method: 'post',
    data: { email, isBanned, loggedInAs },
});

type Props = {
    user: UserManagement;
    allDisabled: boolean;
    isMe: boolean;
    onChange: (_id: User['_id'], isBanned: boolean, loggedInAs: User['loggedInAs']) => void;
}

const UserCard: React.FC<Props> = (props: Props) => {
    const [banned, setBanned] = useState<boolean>(props.user.isBanned);
    const [loggedInAs, setLoggedInAs] = useState<User['loggedInAs']>(props.user.loggedInAs);
    const roles: User['loggedInAs'][] = ['customer', 'manager', 'admin'];

    const handleLoggedInAsChange = (val: User['loggedInAs']) => {
        setLoggedInAs(val);
        if (val !== 'customer') {
            setBanned(false);
        }
    };

    const handleSubmit = async () => {
        try {
            await modifyUser(props.user.email, banned, loggedInAs);
            props.onChange(props.user._id, banned, loggedInAs);
        } catch (e) {
            setBanned(props.user.isBanned);
            setLoggedInAs(props.user.loggedInAs);
        }
    };

    return (
        <Accordion.Item eventKey={props.user._id}>
            <Accordion.Header>
                <span>{`Name: ${props.user.name}`}</span>
                <span className="ps-2">{!props.isMe && `E-mail: ${props.user.email}`}</span>
                {props.isMe
                && <span className="text-info ps-2">You cannot edit your own account.</span>}
            </Accordion.Header>
            <Accordion.Body className="d-flex justify-content-between">
                <Form.Group controlId="userRole">
                    <Form.Label>Is banned:</Form.Label>
                    <Form.Select
                        value={banned ? 'banned' : 'unbanned'}
                        onChange={(val) => setBanned(val.currentTarget.value === 'banned')}
                        disabled={props.allDisabled || loggedInAs !== 'customer'}
                    >
                        <option value="unbanned">Not banned</option>
                        <option value="banned">Banned</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="userRole">
                    <Form.Label>User role:</Form.Label>
                    <Form.Select
                        value={loggedInAs}
                        onChange={(val) => (
                            handleLoggedInAsChange(val.currentTarget.value as User['loggedInAs']))}
                        disabled={props.allDisabled}
                    >
                        {roles.map((val) => <option key={val} value={val}>{val}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button
                    disabled={props.allDisabled || (
                        banned === props.user.isBanned && loggedInAs === props.user.loggedInAs
                    )}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default UserCard;
