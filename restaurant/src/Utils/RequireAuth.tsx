import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

type Props = {
    customer?: boolean;
    manager?: boolean;
    admin?: boolean;
    children: JSX.Element;
};

const RequireAuth: React.FC<Props> = (props) => {
    const authContext = useAuth();
    const location = useLocation();
    const truthTable = [
        (props.customer && authContext.user.loggedInAs === 'customer'),
        (props.manager && authContext.user.loggedInAs === 'manager'),
        (props.admin && authContext.user.loggedInAs === 'admin'),
    ];

    if (!authContext.user.isLoggedIn) {
        return <Navigate to="/auth/signin" state={{ from: location }} replace />;
    }

    if (!truthTable.includes(true)) {
        return <Navigate to="/error" replace />;
    }

    return props.children;
};

RequireAuth.defaultProps = {
    customer: false,
    manager: false,
    admin: false,
};

export default RequireAuth;
