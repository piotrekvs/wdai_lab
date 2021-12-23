import React from 'react';
import {
    Button, Modal, Tabs, Tab,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { DishInput, DishValidation } from '../../Types/Types';
import AddDishForm1Step from './AddDishForm1Step';
import AddDishForm2Step from './AddDishForm2Step';
import {
    validateDishCategory, validateDishCuisine, validateDishDescription,
    validateDishImage,
    validateDishIngredient,
    validateDishMeal, validateDishName, validateDishPriceEuro, validateDishQuantity,
} from './AddDishInputValidation';

type Props = {
    show: boolean;
    onAdd: (d: DishInput) => void;
    onClose: () => void;
    onExited: () => void;
};

type State = {
    dish: DishInput;
    validation: DishValidation;
    tabActiveKey: string;
    isStep1Valid: boolean;
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
        validation: { // (-1) - not used yet, 0 - invalid, 1 - valid
            id: -1,
            name: -1,
            cuisine: -1,
            meal: -1,
            category: -1,
            ingredients: -1,
            quantity: -1,
            priceEuro: -1,
            description: -1,
            images: -1,
        },
        tabActiveKey: STEP_1,
        isStep1Valid: false,
    };

    handleTabActiveKey = (k: string | null) => {
        if (k !== null) {
            this.setState({ tabActiveKey: k });
        }
    };

    handleNextBtn = () => {
        const validate = {
            name: validateDishName(this.state.dish.name),
            cuisine: validateDishCuisine(this.state.dish.cuisine),
            meal: validateDishMeal(this.state.dish.meal),
            category: validateDishCategory(this.state.dish.category),
            description: validateDishDescription(this.state.dish.description),
            quantity: validateDishQuantity(this.state.dish.quantity),
            priceEuro: validateDishPriceEuro(this.state.dish.priceEuro),
        };
        let isStep1Valid = true;
        Object.values(validate).forEach((val) => {
            if (val === 0) isStep1Valid = false;
        });
        this.setState((s) => ({
            validation: {
                ...s.validation,
                ...validate,
            },
            isStep1Valid,
        }));
        if (isStep1Valid) {
            this.handleTabActiveKey(STEP_2);
        }
    };

    handleBackBtn = () => {
        this.handleTabActiveKey(STEP_1);
    };

    handleAddBtn = () => {
        if (this.state.dish.ingredients.length < 2) {
            this.setState((s) => ({ validation: { ...s.validation, ingredients: 0 } }));
            return;
        }
        if (this.state.dish.images.length < 1) {
            this.setState((s) => ({ validation: { ...s.validation, images: 0 } }));
            return;
        }
        if (this.state.isStep1Valid) {
            this.props.onAdd(this.state.dish);
            this.props.onClose();
        }
    };

    handleOnChangeValues = (key: keyof DishInput, val: string) => {
        this.setState((s) => ({ dish: { ...s.dish, [key]: val } }));
    };

    handleAddIngredient = (val: string) => {
        const validation = validateDishIngredient(val);
        this.setState((s) => ({
            validation: {
                ...s.validation,
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
            validation: {
                ...s.validation,
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
                    <Modal.Title>Add dish</Modal.Title>
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
                                validation={this.state.validation}
                            />
                        </Tab>
                        <Tab eventKey="step2" title="Step 2" disabled>
                            <AddDishForm2Step
                                ingredients={this.state.dish.ingredients}
                                addIngredient={this.handleAddIngredient}
                                deleteIngredient={this.handleDeleteIngredient}
                                ingredientsValidation={this.state.validation.ingredients}
                                images={this.state.dish.images}
                                addImage={this.handleAddImage}
                                deleteImage={this.handleDeleteImage}
                                imagesValidation={this.state.validation.images}
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
                            <Button variant="primary" onClick={this.handleAddBtn}>Add Dish</Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddDishModal;
