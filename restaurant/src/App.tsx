import React from 'react';
import './App.css';
import HeaderNavigation from './Components/HeaderNavigation/HeaderNavigation';
import CartPage from './Pages/CartPage/CartPage';
import HomePage from './Pages/HomePage/HomePage';
import MenuPage from './Pages/MenuPage/MenuPage';
import { CartContent } from './Types/Types';

type Props = {}
type State = {
    currency: string;
    page: string;
    numOfOrderedDishes: number;
    cartContent: CartContent;
}

export class App extends React.Component<Props, State> {
    state: State = {
        currency: 'euro',
        page: 'menu',
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
                    page={this.state.page}
                    setPage={(p) => this.setState({ page: p })}
                    numOfOrderedDishes={this.state.numOfOrderedDishes}
                />
                {this.state.page === 'home' && <HomePage />}
                {this.state.page === 'menu' && (
                    <MenuPage
                        currency={this.state.currency}
                        numOfOrderedDishes={this.state.numOfOrderedDishes}
                        changeNumOfOrderedDishes={(x: number) => (
                            this.setState((s) => ({ numOfOrderedDishes: s.numOfOrderedDishes + x }))
                        )}
                    />
                )}
                {this.state.page === 'cart' && <CartPage cartContent={this.state.cartContent} />}
            </div>
        );
    }
}

export default App;
