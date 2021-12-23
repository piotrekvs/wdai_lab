import React from 'react';
import {
    Button, Form, Modal, Row, Col, InputGroup,
} from 'react-bootstrap';
import { Dish } from '../../Types/Types';

type Props = {
    show: boolean;
    onClose: () => void
};
type State = {
    dish: Dish;
};

export class AddDishModal extends React.Component<Props, State> {
    state: State = {
        // eslint-disable-next-line react/no-unused-state
        dish: {
            id: '',
            name: '',
            cuisine: '',
            meal: '',
            category: '',
            ingredients: [],
            quantity: 0,
            priceEuro: 0,
            description: '',
            images: [],
        },
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add dish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Dish name" />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formCuisine">
                                    <Form.Label>Cuisine</Form.Label>
                                    <Form.Control type="text" placeholder="ie. polish, italian" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" placeholder="ie. soup, meat" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formMeal">
                                    <Form.Label>Meal</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select type of meal</option>
                                        <option value="1">Breakfast</option>
                                        <option value="2">Lunch</option>
                                        <option value="3">Dinner</option>
                                        <option value="3">Supper</option>
                                        <option value="3">Dessert</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Short description" />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formPrice">
                                    <Form.Label>Price</Form.Label>
                                    <InputGroup>
                                        <Form.Control type="number" placeholder="Price" />
                                        <InputGroup.Text>€</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formQuantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="number" placeholder="Quantity" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddDishModal;
