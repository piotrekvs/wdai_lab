import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    CartContent, Dish,
} from '../../Types/Types';
import ErrorPage from '../ErrorPage/ErrorPage';
import CartPage from './CartPage/CartPage';
import DishesMenuPage from './DishesMenuPage/DishesMenuPage';
import ProductPage from './ProductPage/ProductPage';

type Props = {
    setNumOfOrderedDishes: (x: number) => void;
};

type State = {
    cartContent: CartContent[];
};

export class MenuPages extends React.Component<Props, State> {
    state: State = {
        cartContent: [],
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
                        />
                    )}
                />
                <Route
                    path="/cart"
                    element={(
                        <CartPage
                            cartContent={this.state.cartContent}
                            onAddToCart={this.handleAddToCart}
                        />
                    )}
                />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        );
    }
}

export default MenuPages;
