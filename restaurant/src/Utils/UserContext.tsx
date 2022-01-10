import React from 'react';
import { IAuthContext } from '../Types/Types';

export const AuthContext = React.createContext<IAuthContext>(undefined as never);

export const useAuth = () => React.useContext(AuthContext);
