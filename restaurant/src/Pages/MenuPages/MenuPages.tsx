import React from 'react';
import { Route, Routes } from 'react-router-dom';
import fakeDataDishes from '../../Data/data';
import {
    CartContent, Dish, StarsReview, StarsReviews,
} from '../../Types/Types';
import CartPage from './CartPage/CartPage';
import DishesMenuPage from './DishesMenuPage/DishesMenuPage';
import ProductPage from './ProductPage/ProductPage';

type Props = {
    currency: string;
    setNumOfOrderedDishes: (x: number) => void;
};

type State = {
    dishes: Dish[];
    cartContent: CartContent[];
    starsReviews: StarsReviews;
    isLoading: boolean;
};

const dishes = fakeDataDishes;

export class MenuPages extends React.Component<Props, State> {
    state: State = {
        dishes,
        cartContent: [],
        starsReviews: [],
        // eslint-disable-next-line react/no-unused-state
        isLoading: false,
    };

    // eslint-disable-next-line react/no-unused-class-component-methods
    handleChangeStarsReview = (id: StarsReview['id'], value: StarsReview['value']) => {
        this.setState((s) => {
            const newStarsReviews = s.starsReviews;
            const idx = newStarsReviews.findIndex((v) => v.id === id);
            if (idx === -1) {
                newStarsReviews.push({ id, value });
            } else {
                newStarsReviews[idx].value = value;
            }
            return ({ starsReviews: newStarsReviews });
        });
    };

    handleAddToCart = (id: Dish['id'], quantity: Dish['quantity']) => {
        this.setState((s) => {
            let cartContent = [...s.cartContent];
            const itemIdx = cartContent.findIndex((val) => val.id === id);
            if (quantity > 0) {
                itemIdx === -1
                    ? cartContent.push({ id, quantity }) : cartContent[itemIdx].quantity = quantity;
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
                            dishes={this.state.dishes}
                            cartContent={this.state.cartContent}
                            onAddToCart={this.handleAddToCart}
                            starsReviews={this.state.starsReviews}
                        />
                    )}
                />
                <Route
                    path="/product/:productId"
                    element={(
                        <ProductPage
                            starsReviews={this.state.starsReviews}
                            cartContent={this.state.cartContent}
                            onAddToCart={this.handleAddToCart}
                        />
                    )}
                />
                <Route
                    path="/cart"
                    element={(
                        <CartPage
                            dishes={this.state.dishes}
                            cartContent={this.state.cartContent}
                            onAddToCart={this.handleAddToCart}
                        />
                    )}
                />
            </Routes>
        );
    }
}

export default MenuPages;
