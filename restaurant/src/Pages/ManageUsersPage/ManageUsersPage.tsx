import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import UserCard from '../../Components/UserCard/UserCard';
import { useAuth } from '../../Utils/AuthContext';

const ManageUsersPage = () => {
    const authContext = useAuth();
    return (
        <Container>
            <h1>Users Management System</h1>
            <Accordion>
                <UserCard key="key" user={authContext.user} />
            </Accordion>
        </Container>
    );
};

export default ManageUsersPage;
