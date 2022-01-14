import axios from 'axios';
import React from 'react';
import {
    Button, Modal, Tabs, Tab,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Dish, DishInput, DishValidation } from '../../Types/Types';
import AddDishForm1Step from './AddDishForm1Step';
import AddDishForm2Step from './AddDishForm2Step';
import {
    validateDishCategory, validateDishCuisine, validateDishDescription,
    validateDishImage, validateDishIngredient,
    validateDishMeal, validateDishName, validateDishPriceEuro, validateDishQuantity,
} from './AddDishInputValidation';

const addNewDish = (newDish: Dish) => axios({
    url: '/restaurant_wdai/dishes',
    method: 'post',
    data: newDish,
});

type Props = {
    show: boolean;
    onChange: () => void;
    onClose: () => void;
    onExited: () => void;
    dish?: Dish;
};

type State = {
    dish: DishInput;
    isValid: DishValidation;
    tabActiveKey: string;
    isEdit: boolean;
};

const STEP_1 = 'step1';
const STEP_2 = 'step2';

export class AddDishModal extends React.Component<Props, State> {
    state: State = {
        dish: {
            id: uuidv4(),
            name: '',
            cuisine: '',
            meal: '',
            category: '',
            ingredients: [],
            quantity: '',
            priceEuro: '',
            description: '',
            images: [],
        },
        isValid: {
            id: true,
            name: true,
            cuisine: true,
            meal: true,
            category: true,
            ingredients: true,
            quantity: true,
            priceEuro: true,
            description: true,
            images: true,
        },
        tabActiveKey: STEP_1,
        isEdit: false,
    };

    componentDidMount() {
        this.setState((s) => {
            if (this.props.dish !== undefined) {
                return {
                    ...s,
                    isEdit: true,
                    dish: {
                        ...this.props.dish,
                        ingredients: [...this.props.dish.ingredients],
                        quantity: this.props.dish.quantity.toString(),
                        priceEuro: (this.props.dish.priceEuro / 100).toString(),
                        images: [...this.props.dish.images],
                    },
                };
            }
            return { ...s, dish: { ...s.dish, id: uuidv4() } };
        });
    }

    handleTabActiveKey = (k: string | null) => {
        if (k !== null) this.setState({ tabActiveKey: k });
    };

    handleNextBtn = () => {
        const valid = {
            name: validateDishName(this.state.dish.name),
            cuisine: validateDishCuisine(this.state.dish.cuisine),
            meal: validateDishMeal(this.state.dish.meal),
            category: validateDishCategory(this.state.dish.category),
            description: validateDishDescription(this.state.dish.description),
            quantity: validateDishQuantity(this.state.dish.quantity),
            priceEuro: validateDishPriceEuro(this.state.dish.priceEuro),
        };
        if (!Object.values(valid).includes(false)) {
            this.handleTabActiveKey(STEP_2);
        }
        this.setState((s) => ({ isValid: { ...s.isValid, ...valid } }));
    };

    handleBackBtn = () => {
        this.handleTabActiveKey(STEP_1);
    };

    handleSubmitBtn = async () => {
        if (this.state.dish.ingredients.length < 2) {
            this.setState((s) => ({ isValid: { ...s.isValid, ingredients: false } }));
            return;
        }
        if (this.state.dish.images.length < 1) {
            this.setState((s) => ({ isValid: { ...s.isValid, images: false } }));
            return;
        }
        const newDish: Dish = {
            _id: '',
            ...this.state.dish,
            ingredients: [...this.state.dish.ingredients],
            quantity: parseInt(this.state.dish.quantity, 10),
            priceEuro: Math.floor(parseFloat(this.state.dish.priceEuro) * 100),
            images: [...this.state.dish.images],
        };
        if (this.state.isEdit) {
            // editDish()
        } else {
            await addNewDish(newDish);
        }
        this.props.onChange();
        this.props.onClose();
    };

    handleOnChangeValues = (key: keyof DishInput, val: string) => {
        this.setState((s) => ({ dish: { ...s.dish, [key]: val } }));
    };

    handleAddIngredient = (val: string) => {
        const validation = validateDishIngredient(val);
        this.setState((s) => ({
            isValid: {
                ...s.isValid,
                ingredients: validation,
            },
        }));
        if (validation) {
            this.setState((s) => (
                { dish: { ...s.dish, ingredients: [...s.dish.ingredients, val] } }));
        }
    };

    handleDeleteIngredient = (idx: number) => {
        this.setState((s) => {
            const newIngredients = s.dish.ingredients.filter((_, i) => i !== idx);
            return ({ dish: { ...s.dish, ingredients: newIngredients } });
        });
    };

    handleAddImage = (val: string) => {
        const validation = validateDishImage(val);
        this.setState((s) => ({
            isValid: {
                ...s.isValid,
                images: validation,
            },
        }));
        if (validation) {
            this.setState((s) => ({ dish: { ...s.dish, images: [...s.dish.images, val] } }));
        }
    };

    handleDeleteImage = (idx: number) => {
        this.setState((s) => {
            const newImages = s.dish.images.filter((_, i) => i !== idx);
            return ({ dish: { ...s.dish, images: newImages } });
        });
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onClose}
                onExited={this.props.onExited}
                backdrop="static"
                keyboard={false}
                size="lg"
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.isEdit ? 'Edit Dish' : 'Add Dish'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={this.state.tabActiveKey}
                        className="mb-3"
                    >
                        <Tab eventKey="step1" title="Step 1" disabled>
                            <AddDishForm1Step
                                values={this.state.dish}
                                onChangeValues={this.handleOnChangeValues}
                                validation={this.state.isValid}
                            />
                        </Tab>
                        <Tab eventKey="step2" title="Step 2" disabled>
                            <AddDishForm2Step
                                ingredients={this.state.dish.ingredients}
                                addIngredient={this.handleAddIngredient}
                                deleteIngredient={this.handleDeleteIngredient}
                                ingredientsValidation={this.state.isValid.ingredients}
                                images={this.state.dish.images}
                                addImage={this.handleAddImage}
                                deleteImage={this.handleDeleteImage}
                                imagesValidation={this.state.isValid.images}
                            />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    {this.state.tabActiveKey === STEP_1 && (
                        <Button variant="primary" onClick={this.handleNextBtn}>Next</Button>
                    )}
                    {this.state.tabActiveKey === STEP_2 && (
                        <>
                            <Button variant="secondary" onClick={this.handleBackBtn}>Back</Button>
                            <Button
                                variant="primary"
                                onClick={this.handleSubmitBtn}
                            >
                                {this.state.isEdit ? 'Submit edit' : 'Add Dish'}
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddDishModal;
