/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unused-state */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderNavigation from './Components/HeaderNavigation/HeaderNavigation';
import HomePage from './Pages/HomePage/HomePage';
import MenuPages from './Pages/MenuPages/MenuPages';
import { IAuthContext, User } from './Types/Types';
import { AuthContext } from './Utils/UserContext';

axios.defaults.baseURL = 'http://localhost:4000/';

type Props = {}

type State = {
    user: User;
    currency: string;
    numOfOrderedDishes: number;
}

export class App extends React.Component<Props, State> {
    state: State = {
        user: {
            isLoggedIn: false,
            id: '',
            name: '',
            email: '',
            loggedInAs: 'guest',
        },
        currency: 'euro',
        numOfOrderedDishes: 0,
    };

    componentDidMount() {
        const jwtToken = localStorage.getItem('jwt_token');
        if (jwtToken) this.signIn(jwtToken);
    }

    signIn = (jwtToken: string, callback?: VoidFunction): void => {
        axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
        const decodedUser = jwtDecode<User>(jwtToken);
        delete decodedUser.iat;
        this.setState({ user: { ...decodedUser, isLoggedIn: true } });
        if (callback) callback();
    };

    signOut = (): void => {
        this.setState({
            user: {
                isLoggedIn: false, id: '', name: '', email: '', loggedInAs: 'guest',
            },
        });
        localStorage.removeItem('jwt_token');
    };

    // eslint-disable-next-line react/sort-comp
    authContext: IAuthContext = {
        user: this.state.user,
        signIn: this.signIn,
        signOut: this.signOut,
    };

    render() {
        return (
            <div className="App">
                <AuthContext.Provider value={this.authContext}>
                    <HeaderNavigation
                        currency={this.state.currency}
                        setCurrency={(c) => this.setState({ currency: c })}
                        numOfOrderedDishes={this.state.numOfOrderedDishes}
                    />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route
                            path="/menu/*"
                            element={(
                                <MenuPages
                                    currency={this.state.currency}
                                    setNumOfOrderedDishes={
                                        (x) => this.setState({ numOfOrderedDishes: x })
                                    }
                                />
                            )}
                        />
                    </Routes>
                </AuthContext.Provider>
            </div>
        );
    }
}

export default App;
