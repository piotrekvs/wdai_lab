/* eslint-disable react/state-in-constructor */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderNavigation from './Components/HeaderNavigation/HeaderNavigation';
import SignIn from './Pages/AuthPages/SignIn';
import SignUp from './Pages/AuthPages/SignUp';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import HomePage from './Pages/HomePage/HomePage';
import MenuPages from './Pages/MenuPages/MenuPages';
import { IAuthContext, ICurrencyContext, User } from './Types/Types';
import { CurrencyContext } from './Utils/CurrencyContext';
import { AuthContext } from './Utils/AuthContext';
import ManageUsersPage from './Pages/ManageUsersPage/ManageUsersPage';
import RequireGuest from './Utils/RequireGuest';
import RequireAuth from './Utils/RequireAuth';

axios.defaults.baseURL = 'http://localhost:4000/';

type Props = {}

type State = {
    authContext: IAuthContext;
    currency: ICurrencyContext;
    numOfOrderedDishes: number;
}

export class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            authContext: {
                user: {
                    isLoggedIn: false,
                    _id: '',
                    name: '',
                    email: '',
                    loggedInAs: 'guest',
                },
                signIn: this.signIn,
                signOut: this.signOut,
            },
            currency: {
                name: 'euro',
                cnvFactor: 1,
            },
            numOfOrderedDishes: 0,
        };
    }

    componentDidMount() {
        const jwtToken = localStorage.getItem('jwt_token');
        if (jwtToken) this.signIn(jwtToken);
    }

    signIn = (jwtToken: string, callback?: VoidFunction): void => {
        axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
        localStorage.setItem('jwt_token', jwtToken);
        const decodedUser = jwtDecode<User>(jwtToken);
        delete decodedUser.iat;
        this.setState((s) => ({
            authContext: { ...s.authContext, user: { ...decodedUser, isLoggedIn: true } },
        }));
        if (callback) callback();
    };

    signOut = (callback?: VoidFunction): void => {
        this.setState((s) => ({
            authContext: {
                ...s.authContext,
                user: {
                    isLoggedIn: false, _id: '', name: '', email: '', loggedInAs: 'guest',
                },
            },
        }));
        delete axios.defaults.headers.common.Authorization;
        localStorage.removeItem('jwt_token');
        if (callback) callback();
    };

    handleChangeCurrency = (name: ICurrencyContext['name']): void => {
        const cnvFactors = { euro: 1, usd: 0.88 };
        this.setState({ currency: { name, cnvFactor: cnvFactors[name] } });
    };

    handleNumOfOrderedDishes = (x: number): void => this.setState({ numOfOrderedDishes: x });

    render() {
        return (
            <div className="App">
                <AuthContext.Provider value={this.state.authContext}>
                    <CurrencyContext.Provider value={this.state.currency}>
                        <HeaderNavigation
                            setCurrency={this.handleChangeCurrency}
                            numOfOrderedDishes={this.state.numOfOrderedDishes}
                        />
                        <Routes>
                            <Route index element={<HomePage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route
                                path="/menu/*"
                                element={(
                                    <MenuPages
                                        setNumOfOrderedDishes={this.handleNumOfOrderedDishes}
                                    />
                                )}
                            />
                            <Route path="/auth" element={<RequireGuest />}>
                                <Route index element={<Navigate to="signin" replace />} />
                                <Route path="signin" element={<SignIn />} />
                                <Route path="signup" element={<SignUp />} />
                            </Route>
                            <Route
                                path="/manage_users"
                                element={<RequireAuth admin><ManageUsersPage /></RequireAuth>}
                            />
                            <Route path="/*" element={<ErrorPage />} />
                        </Routes>
                    </CurrencyContext.Provider>
                </AuthContext.Provider>
            </div>
        );
    }
}

export default App;
