import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

type Props = {};

const RequireGuest: React.FC<Props> = () => {
    const authContext = useAuth();

    if (authContext.user.isLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default RequireGuest;
