import React from 'react';
import '../DishesMenuPage/DishesMenuPage.css';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import {
    Dish, Pagination as PaginationType,
} from '../../../Types/Types';
import DishCardAdd from '../../../Components/ProductCard/DishCardAdd';
import AddDishModal from '../../../Components/AddDishModal/AddDishModal';
import PaginationButtons from '../../../Components/PaginationButtons/PaginationButtons';
import DishesMenuToolbar from '../../../Components/DishesMenuToolbar/DishesMenuToolbar';
import DishCardEdit from '../../../Components/ProductCard/DishCardEdit';

const getDishes = (offset: number, limit: number) => axios({
    url: '/restaurant_wdai/dishes',
    method: 'get',
    params: {
        offset,
        limit,
    },
});

const deleteDish = (id: Dish['id']) => axios({
    url: `/restaurant_wdai/dishes/${id}`,
    method: 'delete',
});

const itemsOnPageArray = [3, 7];

type Props = {};

type State = {
    dishes: Dish[];
    pagination: PaginationType;
    addDishModalShow: boolean;
    addDishModalMount: boolean;
    editDishModalShow: boolean;
    editDishModalMount: boolean;
    dishToEdit: Dish | undefined;
};

export class ManageDishesPage extends React.Component<Props, State> {
    state: State = {
        dishes: [],
        pagination: {
            itemsLength: 0,
            itemsOnPage: itemsOnPageArray[0],
            pages: 0,
            active: 0,
        },
        addDishModalShow: false,
        addDishModalMount: false,
        editDishModalShow: false,
        editDishModalMount: false,
        dishToEdit: undefined,
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
        } catch (e) {
            // TODO: handle errors
        }
    };

    handleAddDishBtn = () => {
        this.setState({ addDishModalShow: true, addDishModalMount: true });
    };

    handleOnChangeDish = () => {
        this.fetchProducts();
    };

    handleDelete = async (id: Dish['id']) => {
        await deleteDish(id);
        this.fetchProducts();
    };

    handleActiveChange = (active: number) => {
        this.setState((s) => ({ ...s, pagination: { ...s.pagination, active } }));
    };

    handleChangeItemsOnPage = (itemsOnPage: PaginationType['itemsOnPage']) => {
        this.setState((s) => ({ pagination: { ...s.pagination, itemsOnPage, active: 0 } }));
    };

    handleEdit = (dish: Dish): void => {
        this.setState({ dishToEdit: dish, editDishModalShow: true, editDishModalMount: true });
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
                        <DishCardAdd onClick={this.handleAddDishBtn} />
                        {this.state.dishes.map((dish: Dish) => (
                            <DishCardEdit
                                key={dish.id}
                                dish={dish}
                                onDelete={() => this.handleDelete(dish.id)}
                                onEdit={() => this.handleEdit(dish)}
                            />
                        ))}
                    </Container>
                    <PaginationButtons
                        active={this.state.pagination.active}
                        pages={this.state.pagination.pages}
                        onChange={this.handleActiveChange}
                    />
                </div>
                {this.state.addDishModalMount && (
                    <AddDishModal
                        show={this.state.addDishModalShow}
                        onChange={this.handleOnChangeDish}
                        onClose={() => this.setState({ addDishModalShow: false })}
                        onExited={() => this.setState({ addDishModalMount: false })}
                    />
                )}
                {this.state.editDishModalMount && (
                    <AddDishModal
                        show={this.state.editDishModalShow}
                        onChange={this.handleOnChangeDish}
                        onClose={() => this.setState(
                            { editDishModalShow: false, dishToEdit: undefined },
                        )}
                        onExited={() => this.setState({ editDishModalMount: false })}
                        dish={this.state.dishToEdit}
                    />
                )}
            </div>
        );
    }
}

export default ManageDishesPage;
