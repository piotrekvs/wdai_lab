import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    CartContent, Dish,
} from '../../Types/Types';
import CartPage from './CartPage/CartPage';
import DishesMenuPage from './DishesMenuPage/DishesMenuPage';
import ProductPage from './ProductPage/ProductPage';

type Props = {
    currency: string;
    setNumOfOrderedDishes: (x: number) => void;
};

type State = {
    cartContent: CartContent[];
    isLoading: boolean;
};

export class MenuPages extends React.Component<Props, State> {
    state: State = {
        cartContent: [],
        // eslint-disable-next-line react/no-unused-state
        isLoading: false,
    };

    handleAddToCart = (id: Dish['id'], quantity: Dish['quantity'], dish: Dish) => {
        this.setState((s) => {
            let cartContent = [...s.cartContent];
            const itemIdx = cartContent.findIndex((val) => val.id === id);
            const newDish = JSON.parse(JSON.stringify(dish));
            if (quantity > 0) {
                itemIdx === -1
                    ? cartContent.push({ id, quantity, dish: newDish })
                    : cartContent[itemIdx] = { id, quantity, dish: newDish };
            } else {
                cartContent = cartContent.filter((val) => val.id !== id);
            }
            this.props.setNumOfOrderedDishes(
                cartContent.reduce((prevVal, item) => item.quantity + prevVal, 0),
            );
            return { ...s, cartContent };
        });
    };

    render() {
        return (
            <Routes>
                <Route
                    path=""
                    element={(
                        <DishesMenuPage
                            currency={this.props.currency}
                            cartContent={this.state.cartContent}
                            onAddToCart={this.handleAddToCart}
                        />
                    )}
                />
                <Route
                    path="/product/:productId"
                    element={(
                        <ProductPage
                            cartContent={this.state.cartContent}
                            onAddToCart={this.handleAddToCart}
                            currency={this.props.currency}
                        />
                    )}
                />
                <Route
                    path="/cart"
                    element={(
                        <CartPage
                            cartContent={this.state.cartContent}
                            onAddToCart={this.handleAddToCart}
                            currency={this.props.currency}
                        />
                    )}
                />
            </Routes>
        );
    }
}

export default MenuPages;
