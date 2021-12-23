import React from 'react';
import {
    Col, Form, InputGroup, Row,
} from 'react-bootstrap';
import { DishInput, DishValidation } from '../../Types/Types';

type Props = {
    values: DishInput;
    validation: DishValidation;
    onChangeValues: (key: keyof DishInput, val: string) => void;
}

const AddDishForm1Step: React.FC<Props> = (props: Props) => (
    <Form>
        <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Dish name"
                value={props.values.name}
                onChange={(val) => props.onChangeValues('name', val.currentTarget.value)}
                isInvalid={!props.validation.name}
            />
        </Form.Group>

        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formCuisine">
                    <Form.Label>Cuisine</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ie. polish, italian"
                        value={props.values.cuisine}
                        onChange={(val) => props.onChangeValues('cuisine', val.currentTarget.value)}
                        isInvalid={!props.validation.cuisine}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ie. soup, meat"
                        value={props.values.category}
                        onChange={
                            (val) => props.onChangeValues('category', val.currentTarget.value)
                        }
                        isInvalid={!props.validation.category}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formMeal">
                    <Form.Label>Meal</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        value={props.values.meal}
                        onChange={(val) => props.onChangeValues('meal', val.currentTarget.value)}
                        isInvalid={!props.validation.meal}
                    >
                        <option>Select type of meal</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="supper">Supper</option>
                        <option value="dessert">Dessert</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
                as="textarea"
                placeholder="Short description"
                value={props.values.description}
                onChange={(val) => props.onChangeValues('description', val.currentTarget.value)}
                isInvalid={!props.validation.description}
            />
        </Form.Group>

        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="number"
                            placeholder="Price"
                            value={props.values.priceEuro}
                            onChange={
                                (val) => props.onChangeValues('priceEuro', val.currentTarget.value)
                            }
                            isInvalid={!props.validation.priceEuro}
                        />
                        <InputGroup.Text>€</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="formQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Quantity"
                        value={props.values.quantity}
                        onChange={
                            (val) => props.onChangeValues('quantity', val.currentTarget.value)
                        }
                        isInvalid={!props.validation.quantity}
                    />
                </Form.Group>
            </Col>
        </Row>
    </Form>
);

export default AddDishForm1Step;
