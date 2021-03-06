import React from 'react';
import './DishesMenuPage.css';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import {
    CartContent,
    Dish, Pagination as PaginationType,
} from '../../../Types/Types';
import DishCard from '../../../Components/ProductCard/DishCard';
import PaginationButtons from '../../../Components/PaginationButtons/PaginationButtons';
import DishesMenuToolbar from '../../../Components/DishesMenuToolbar/DishesMenuToolbar';

const getDishes = (offset: number, limit: number) => axios({
    url: '/restaurant_wdai/dishes',
    method: 'get',
    params: {
        offset,
        limit,
    },
});

const itemsOnPageArray = [4, 8];

type Props = {
    cartContent: CartContent[];
    onAddToCart: (id: Dish['id'], quantity: Dish['quantity'], dish: Dish) => void;
};

type State = {
    dishes: Dish[];
    pagination: PaginationType;
    cheapestDishId: Dish['id'];
    mostExpensiveDishId: Dish['id'];
};

export class DishesMenuPage extends React.Component<Props, State> {
    state: State = {
        dishes: [],
        pagination: {
            itemsLength: 0,
            itemsOnPage: itemsOnPageArray[0],
            pages: 0,
            active: 0,
        },
        cheapestDishId: '',
        mostExpensiveDishId: '',
    };

    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate(_: Props, prevState: State) {
        if (this.state.pagination.active !== prevState.pagination.active
            || this.state.pagination.itemsOnPage !== prevState.pagination.itemsOnPage) {
            this.fetchProducts();
        }
    }

    fetchProducts = async () => {
        try {
            const offset = this.state.pagination.active * this.state.pagination.itemsOnPage;
            const productsRes = await getDishes(offset, this.state.pagination.itemsOnPage);
            this.setState((s) => {
                const pages = Math.ceil(productsRes.data.counter / s.pagination.itemsOnPage);
                const active = Math.min(s.pagination.active, pages - 1);
                return ({
                    ...s,
                    dishes: productsRes.data.dishes,
                    pagination: {
                        ...s.pagination,
                        itemsLength: productsRes.data.counter,
                        pages,
                        active,
                    },
                });
            });
            this.findMostLeastExpensiveDish();
        } catch (e) {
            // TODO: handle errors
        }
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
            return ({
                cheapestDishId: cheapestDish.id,
                mostExpensiveDishId: mostExpensiveDish.id,
            });
        });
    };

    handleBorderColor = (id: Dish['id']) => {
        if (this.state.cheapestDishId === id) {
            return 'danger';
        } if (this.state.mostExpensiveDishId === id) {
            return 'success';
        }
        return '';
    };

    findOrderedQuantity = (id: Dish['id']) => {
        const itemIdx = this.props.cartContent.findIndex((item) => item.id === id);
        return itemIdx === -1 ? 0 : this.props.cartContent[itemIdx].quantity;
    };

    handleActiveChange = (active: number) => {
        this.setState((s) => ({ ...s, pagination: { ...s.pagination, active } }));
    };

    handleChangeItemsOnPage = (itemsOnPage: PaginationType['itemsOnPage']) => {
        this.setState((s) => ({ pagination: { ...s.pagination, itemsOnPage, active: 0 } }));
    };

    render() {
        return (
            <div>
                <div>
                    <DishesMenuToolbar
                        itemsOnPage={this.state.pagination.itemsOnPage}
                        itemsOnPageArray={itemsOnPageArray}
                        onChangeItemsOnPage={(i) => this.handleChangeItemsOnPage(i)}
                    />
                    <Container className="dishes-container">
                        {this.state.dishes.map((dish: Dish) => (
                            <DishCard
                                withImage
                                key={dish.id}
                                dish={dish}
                                orderedQuantity={this.findOrderedQuantity(dish.id)}
                                onAddToCart={this.props.onAddToCart}
                                borderColor={this.handleBorderColor(dish.id)}
                            />
                        ))}
                    </Container>
                    <PaginationButtons
                        active={this.state.pagination.active}
                        pages={this.state.pagination.pages}
                        onChange={this.handleActiveChange}
                    />
                </div>
            </div>
        );
    }
}

export default DishesMenuPage;
