/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { User } from '../../Types/Types';

type Props = {
    user: User;
}

const UserCard: React.FC<Props> = (props: Props) => {
    const [banned, setBanned] = useState<boolean>(props.user.isBanned);
    const [loggedInAs, setLoggedInAs] = useState<User['loggedInAs']>(props.user.loggedInAs);
    const roles: User['loggedInAs'][] = ['customer', 'manager', 'admin'];

    return (
        <Accordion.Item eventKey={props.user._id}>
            <Accordion.Header>{`Name: ${props.user.name}`}</Accordion.Header>
            <Accordion.Body className="d-flex justify-content-between">
                <Form.Group controlId="userRole">
                    <Form.Label>Is banned:</Form.Label>
                    <Form.Select
                        value={banned ? 'banned' : 'unbanned'}
                        onChange={(val) => setBanned(val.currentTarget.value === 'banned')}
                    >
                        <option value="unbanned">Not banned</option>
                        <option value="banned">Banned</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="userRole">
                    <Form.Label>User role:</Form.Label>
                    <Form.Select
                        value={loggedInAs}
                        onChange={(val) => setLoggedInAs(
                            val.currentTarget.value as User['loggedInAs'],
                        )}
                    >
                        {roles.map((val) => <option value={val}>{val}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button>Save</Button>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default UserCard;
