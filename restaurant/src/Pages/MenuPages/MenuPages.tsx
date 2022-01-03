import React from 'react';
import { Route, Routes } from 'react-router-dom';
import fakeDataDishes from '../../Data/data';
import {
    CartContent, Dish, StarsReview, StarsReviews,
} from '../../Types/Types';
import CartPage from './CartPage/CartPage';
import DishesMenuPage from './DishesMenuPage/DishesMenuPage';

type Props = {
    currency: string;
    setNumOfOrderedDishes: (x: number) => void;
};

type State = {
    dishes: Dish[];
    cartContent: CartContent;
    starsReviews: StarsReviews;
    isLoading: boolean;
};

const dishes = fakeDataDishes;

export class MenuPages extends React.Component<Props, State> {
    state: State = {
        dishes,
        cartContent: {
            totalPriceEuro: 0,
            totalQuantity: 0,
            orders: [],
        },
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

    render() {
        return (
            <Routes>
                <Route
                    path="/"
                    element={(
                        <DishesMenuPage
                            currency={this.props.currency}
                            dishes={this.state.dishes}
                            starsReviews={this.state.starsReviews}
                        />
                    )}
                />
                <Route
                    path="/cart"
                    element={<CartPage cartContent={this.state.cartContent} />}
                />
            </Routes>
        );
    }
}

export default MenuPages;
