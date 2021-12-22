import React from 'react';
import './MenuPage.css';
import { Dish } from '../../Types/Types';
import dishes from '../../Data/data';
import DishCard from '../../Components/ProductCard/DishCard';
import DishCardAdd from '../../Components/ProductCard/DishCardAdd';

type Props = {
    currency: string;
};

type State = {
    dishes: Dish[];
};

export class MenuPage extends React.Component<Props, State> {
    state: State = {
        dishes,
    };

    render() {
        return (
            <div className="container">
                <DishCardAdd />
                {this.state.dishes.map((dish: Dish) => (
                    <DishCard
                        dish={dish}
                        currency={this.props.currency}
                        currencyFactor={1}
                    />
                ))}
            </div>
        );
    }
}

export default MenuPage;
