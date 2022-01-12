import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireAuthClient = ({ children }: { children: JSX.Element }) => {
    const authContext = useAuth();
    const location = useLocation();

    if (!authContext.user) {
        // Redirect them to the /signin page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;
