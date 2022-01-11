import React from 'react';
import { IAuthContext, WithAuthHOC } from '../Types/Types';

export const AuthContext = React.createContext<IAuthContext>(undefined as never);

export const useAuth = () => React.useContext(AuthContext);

export const withUser: WithAuthHOC = (ChildComponent) => (
    (props: unknown) => (
        <AuthContext.Consumer>
            {(authContext) => <ChildComponent {...props as unknown} authContext={authContext} />}
        </AuthContext.Consumer>
    )
);
