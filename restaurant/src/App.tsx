import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderNavigation from './Components/HeaderNavigation/HeaderNavigation';
import CartPage from './Pages/CartPage/CartPage';
import HomePage from './Pages/HomePage/HomePage';
import MenuPage from './Pages/MenuPage/MenuPage';
import { CartContent } from './Types/Types';

type Props = {}
type State = {
    currency: string;
    numOfOrderedDishes: number;
    cartContent: CartContent;
}

export class App extends React.Component<Props, State> {
    state: State = {
        currency: 'euro',
        numOfOrderedDishes: 0,
        cartContent: {
            totalPriceEuro: 0,
            totalQuantity: 0,
            orders: [],
        },
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
                            <MenuPage
                                currency={this.state.currency}
                                numOfOrderedDishes={this.state.numOfOrderedDishes}
                                changeNumOfOrderedDishes={(x: number) => (
                                    this.setState((s) => (
                                        { numOfOrderedDishes: s.numOfOrderedDishes + x }))
                                )}
                            />
                        )}
                    />
                    <Route
                        path="/cart"
                        element={<CartPage cartContent={this.state.cartContent} />}
                    />
                </Routes>
            </div>
        );
    }
}

export default App;
