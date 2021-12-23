import React from 'react';
import './MenuPage.css';
import { Dish } from '../../Types/Types';
import dishes from '../../Data/data';
import DishCard from '../../Components/ProductCard/DishCard';
import DishCardAdd from '../../Components/ProductCard/DishCardAdd';
import AddDishModal from '../../Components/AddDishModal/AddDishModal';

type Props = {
    currency: string;
    numOfOrderedDishes: number;
    changeNumOfOrderedDishes: (x: number) => void;
};

type State = {
    dishes: Dish[];
    cheapestDishId: Dish['id'];
    mostExpensiveDishId: Dish['id'];
    addDishModalShow: boolean;
};

export class MenuPage extends React.Component<Props, State> {
    state: State = {
        dishes,
        cheapestDishId: '',
        mostExpensiveDishId: '',
        addDishModalShow: false,
    };

    componentDidMount() {
        this.findMostLeastExpensiveDish();
    }

    handleBorderColor = (id: Dish['id']) => {
        if (this.state.cheapestDishId === id) {
            return 'danger';
        } if (this.state.mostExpensiveDishId === id) {
            return 'success';
        }
        return '';
    };

    handleDelete = (id: Dish['id']) => {
        this.setState((s) => {
            const newDishes = s.dishes.filter((dish: Dish) => dish.id !== id);
            return { dishes: newDishes };
        });
        this.findMostLeastExpensiveDish();
    };

    handleAddDishBtn = () => {
        this.setState({ addDishModalShow: true });
    };

    findMostLeastExpensiveDish = () => {
        this.setState((s) => {
            const mostExpensiveDish = { price: 0, id: '' };
            const cheapestDish = { price: Infinity, id: '' };
            s.dishes.forEach((val) => {
                if (mostExpensiveDish.price < val.priceEuro) {
                    mostExpensiveDish.price = val.priceEuro;
                    mostExpensiveDish.id = val.id;
                }
                if (cheapestDish.price > val.priceEuro) {
                    cheapestDish.price = val.priceEuro;
                    cheapestDish.id = val.id;
                }
            });
            return { cheapestDishId: cheapestDish.id, mostExpensiveDishId: mostExpensiveDish.id };
        });
    };

    render() {
        return (
            <div className="container">
                <DishCardAdd onClick={this.handleAddDishBtn} />
                {this.state.dishes.map((dish: Dish) => (
                    <DishCard
                        key={dish.id}
                        dish={dish}
                        currency={this.props.currency}
                        currencyFactor={this.props.currency === 'euro' ? 1 : 0.88}
                        changeOrderedQuantity={(x) => this.props.changeNumOfOrderedDishes(x)}
                        borderColor={this.handleBorderColor(dish.id)}
                        onDelete={() => this.handleDelete(dish.id)}
                    />
                ))}
                <AddDishModal
                    show={this.state.addDishModalShow}
                    onClose={() => this.setState({ addDishModalShow: false })}
                />
            </div>
        );
    }
}

export default MenuPage;
