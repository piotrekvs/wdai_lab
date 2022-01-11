/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unused-state */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderNavigation from './Components/HeaderNavigation/HeaderNavigation';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import HomePage from './Pages/HomePage/HomePage';
import MenuPages from './Pages/MenuPages/MenuPages';
import { IAuthContext, ICurrencyContext, User } from './Types/Types';
import { CurrencyContext } from './Utils/CurrencyContext';
import { AuthContext } from './Utils/UserContext';

axios.defaults.baseURL = 'http://localhost:4000/';

type Props = {}

type State = {
    user: User;
    currency: ICurrencyContext;
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
        currency: {
            name: 'euro',
            cnvFactor: 1,
        },
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

    handleChangeCurrency = (name: ICurrencyContext['name']): void => {
        const cnvFactors = { euro: 1, usd: 0.88 };
        this.setState({ currency: { name, cnvFactor: cnvFactors[name] } });
    };

    handleNumOfOrderedDishes = (x: number): void => this.setState({ numOfOrderedDishes: x });

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
                    <CurrencyContext.Provider value={this.state.currency}>
                        <HeaderNavigation
                            setCurrency={this.handleChangeCurrency}
                            numOfOrderedDishes={this.state.numOfOrderedDishes}
                        />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route
                                path="/menu/*"
                                element={(
                                    <MenuPages
                                        setNumOfOrderedDishes={this.handleNumOfOrderedDishes}
                                    />
                                )}
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
