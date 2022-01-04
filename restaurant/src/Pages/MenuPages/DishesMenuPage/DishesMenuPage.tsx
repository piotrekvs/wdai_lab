import React from 'react';
import './DishesMenuPage.css';
import {
    Dish, DishInput, StarsReview, StarsReviews,
} from '../../../Types/Types';
import DishCard from '../../../Components/ProductCard/DishCard';
import DishCardAdd from '../../../Components/ProductCard/DishCardAdd';
import AddDishModal from '../../../Components/AddDishModal/AddDishModal';

type Props = {
    currency: string;
    dishes: Dish[];
    starsReviews: StarsReviews;
    onAddToCart: (id: Dish['id'], quantity: Dish['quantity']) => void;
};

type State = {
    cheapestDishId: Dish['id'];
    mostExpensiveDishId: Dish['id'];
    addDishModalShow: boolean;
    addDishModalMount: boolean
};

export class DishesMenuPage extends React.Component<Props, State> {
    state: State = {
        cheapestDishId: '',
        mostExpensiveDishId: '',
        addDishModalShow: false,
        addDishModalMount: false,
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

    handleAddDishBtn = () => {
        this.setState({ addDishModalShow: true, addDishModalMount: true });
    };

    // eslint-disable-next-line class-methods-use-this
    handleAddNewDish = (d: DishInput) => {
        // TODO
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const newDish: Dish = {
            id: d.id,
            name: d.name,
            cuisine: d.cuisine,
            meal: d.meal,
            category: d.category,
            ingredients: [...d.ingredients],
            quantity: parseInt(d.quantity, 10),
            priceEuro: Math.floor(parseFloat(d.priceEuro) * 100),
            description: d.description,
            images: [...d.images],
        };
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleDelete = (id: Dish['id']) => {
        // TODO
        this.findMostLeastExpensiveDish();
    };

    findMostLeastExpensiveDish = () => {
        const mostExpensiveDish = { price: 0, id: '' };
        const cheapestDish = { price: Infinity, id: '' };
        this.props.dishes.forEach((val) => {
            if (mostExpensiveDish.price < val.priceEuro) {
                mostExpensiveDish.price = val.priceEuro;
                mostExpensiveDish.id = val.id;
            }
            if (cheapestDish.price > val.priceEuro) {
                cheapestDish.price = val.priceEuro;
                cheapestDish.id = val.id;
            }
        });
        this.setState(
            { cheapestDishId: cheapestDish.id, mostExpensiveDishId: mostExpensiveDish.id },
        );
    };

    render() {
        return (
            <div className="container">
                <DishCardAdd onClick={this.handleAddDishBtn} />
                {this.props.dishes.map((dish: Dish) => (
                    <DishCard
                        key={dish.id}
                        dish={dish}
                        onAddToCart={this.props.onAddToCart}
                        currency={this.props.currency}
                        currencyFactor={this.props.currency === 'euro' ? 1 : 0.88}
                        borderColor={this.handleBorderColor(dish.id)}
                        onDelete={() => this.handleDelete(dish.id)}
                        starsReview={this.props.starsReviews.find(
                            (v: StarsReview) => v.id === dish.id,
                        )}
                    />
                ))}
                {this.state.addDishModalMount && (
                    <AddDishModal
                        show={this.state.addDishModalShow}
                        onAdd={this.handleAddNewDish}
                        onClose={() => this.setState({ addDishModalShow: false })}
                        onExited={() => this.setState({ addDishModalMount: false })}
                    />
                )}
            </div>
        );
    }
}

export default DishesMenuPage;
