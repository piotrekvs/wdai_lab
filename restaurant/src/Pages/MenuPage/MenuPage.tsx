import React from 'react';
import './MenuPage.css';
import {
    Dish, DishInput, StarsReview, StarsReviews,
} from '../../Types/Types';
import fakeDataDishes from '../../Data/data';
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
    starsReviews: StarsReviews;
    cheapestDishId: Dish['id'];
    mostExpensiveDishId: Dish['id'];
    addDishModalShow: boolean;
    addDishModalMount: boolean
};

let dishes = fakeDataDishes;

export class MenuPage extends React.Component<Props, State> {
    state: State = {
        dishes,
        starsReviews: [],
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

    handleDelete = (id: Dish['id']) => {
        dishes = dishes.filter((dish: Dish) => dish.id !== id);
        this.setState({ dishes });
        this.findMostLeastExpensiveDish();
    };

    handleAddDishBtn = () => {
        this.setState({ addDishModalShow: true, addDishModalMount: true });
    };

    handleAddNewDish = (d: DishInput) => {
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
        dishes.push(newDish);
        this.setState({ dishes });
        this.findMostLeastExpensiveDish();
    };

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
                        starsReview={this.state.starsReviews.find(
                            (v: StarsReview) => v.id === dish.id,
                        )}
                        changeStarsReview={this.handleChangeStarsReview}
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

export default MenuPage;
