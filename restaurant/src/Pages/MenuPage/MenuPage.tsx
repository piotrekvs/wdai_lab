import React from 'react';
import './MenuPage.css';
import { Dish } from '../../Types/Types';
import dishes from '../../Data/data';
import DishCard from '../../Components/ProductCard/DishCard';
import DishCardAdd from '../../Components/ProductCard/DishCardAdd';

type Props = {
    currency: string;
    numOfOrderedDishes: number;
    changeNumOfOrderedDishes: (x: number) => void;
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
                        currencyFactor={this.props.currency === 'euro' ? 1 : 0.88}
                        changeOrderedQuantity={(x) => this.props.changeNumOfOrderedDishes(x)}
                    />
                ))}
            </div>
        );
    }
}

export default MenuPage;
