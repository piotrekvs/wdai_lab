/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import {
    Button,
    Carousel, Col, Container, Form, ListGroup, Row,
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import DishStarsReview from '../../../Components/DishStarsReview/DishStarsReview';
import DishCard from '../../../Components/ProductCard/DishCard';
import {
    CartContent, Dish, DishReview, TextReview,
} from '../../../Types/Types';
import './ProductPage.css';

type LocationState = {
    dish: Dish;
}

type Props = {
    cartContent: CartContent[];
    onAddToCart: (id: Dish['id'], quantity: Dish['quantity']) => void;
    currency: string;
};

type State = {
    review: DishReview;
    newReview: TextReview;
}

const ProductPage: React.FC<Props> = (props: Props) => {
    const location = useLocation();
    const { dish } = location.state as LocationState;
    const [dishReviews, setDishReviews] = useState<State['review']>(() => ({
        id: '',
        stars: 0,
        reviews: [],
    }));
    const [newReview, setNewReview] = useState<State['newReview']>(() => ({
        stars: 0,
        name: '',
        text: '',
        purchaseDate: '',
    }));

    const findOrderedQuantity = (id: Dish['id']) => {
        const itemIdx = props.cartContent.findIndex((item) => item.id === id);
        return itemIdx === -1 ? 0 : props.cartContent[itemIdx].quantity;
    };

    return (
        <Container className="d-grid">
            <Row className="row-container">
                <Col md={8}>
                    <Link to="/menu">
                        <Button className="mb-1">Powrót do menu</Button>
                    </Link>
                    <Carousel className="carousel-wrapper">
                        {dish.images.map((image) => (
                            <Carousel.Item className="carousel-item-wrapper">
                                <img
                                    className="d-block img-wrapper"
                                    src={image}
                                    alt="slide"
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                <Col md={4}>
                    <DishCard
                        withImage={false}
                        key={dish.id}
                        dish={dish}
                        orderedQuantity={findOrderedQuantity(dish.id)}
                        onAddToCart={props.onAddToCart}
                        currency={props.currency}
                        currencyFactor={props.currency === 'euro' ? 1 : 0.88}
                        borderColor=""
                        onDelete={() => undefined}
                    />
                </Col>
            </Row>
            <Row className="row-container">
                <Col md={8}>
                    <Container className="d-flex justify-content-end mb-5">
                        <div className="me-2">
                            Dish rating:
                        </div>
                        <DishStarsReview
                            starsReview={dishReviews.stars}
                            onChange={() => undefined}
                        />
                        <div className="ms-2">
                            {`(based on ${dishReviews.reviews.length} reviews)`}
                        </div>
                    </Container>
                    <Form className="border p-2">
                        <Row>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="text" placeholder="Your Nick" id="fi-1" />
                                    <Form.Label htmlFor="fi-1">Your Nick</Form.Label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="date" />
                                    <Form.Label>Date of Purchase</Form.Label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <div className="d-flex justify-content-center">
                                    <DishStarsReview starsReview={3} onChange={() => undefined} />
                                </div>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={2} placeholder="Review" />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button>Dodaj opinię</Button>
                        </div>
                    </Form>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>Nick</h3>
                            <p>Review.</p>
                            <p>Date of purchase: 121121</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4} />
            </Row>
        </Container>
    );
};

export default ProductPage;
