import axios from 'axios';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderNavigation from './Components/HeaderNavigation/HeaderNavigation';
import HomePage from './Pages/HomePage/HomePage';
import MenuPages from './Pages/MenuPages/MenuPages';

axios.defaults.baseURL = 'http://localhost:4000/';

type Props = {}

type State = {
    currency: string;
    numOfOrderedDishes: number;
}

export class App extends React.Component<Props, State> {
    state: State = {
        currency: 'euro',
        numOfOrderedDishes: 0,
    };

    render() {
        return (
            <div className="App">
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
            </div>
        );
    }
}

export default App;
