/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import UserCard from '../../Components/UserCard/UserCard';
import { UserManagement } from '../../Types/Types';
import { useAuth } from '../../Utils/AuthContext';

type Props = {};
type State = {
    users: UserManagement[];
}

const getUsers = () => axios({
    url: '/restaurant_wdai/auth/modify',
    method: 'get',
});

const ManageUsersPage: React.FC<Props> = () => {
    const authContext = useAuth();
    const [users, setUsers] = useState<State['users']>([]);

    const fetchUsers = async () => {
        const res = await getUsers();
        const filteredUsers = (res.data.users as State['users']).filter(
            (val) => val._id !== authContext.user._id,
        );
        setUsers(filteredUsers);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Container>
            <h1>Users Management System</h1>
            <Accordion>
                <UserCard
                    key={authContext.user._id}
                    user={authContext.user}
                    allDisabled
                    isMe
                />
                {users.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        allDisabled={false}
                        isMe={false}
                    />
                ))}
            </Accordion>
        </Container>
    );
};

export default ManageUsersPage;
