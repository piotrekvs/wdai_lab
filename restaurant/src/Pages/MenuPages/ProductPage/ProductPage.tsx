/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import {
    Button,
    Carousel, Col, Container, ListGroup, Row,
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import AddDishReview from '../../../Components/AddDishReview/AddDishReview';
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
}

const ProductPage: React.FC<Props> = (props: Props) => {
    const location = useLocation();
    const { dish } = location.state as LocationState;
    const [dishReviews, setDishReviews] = useState<State['review']>(() => ({
        id: '',
        stars: 0,
        reviews: [],
    }));

    const findOrderedQuantity = (id: Dish['id']) => {
        const itemIdx = props.cartContent.findIndex((item) => item.id === id);
        return itemIdx === -1 ? 0 : props.cartContent[itemIdx].quantity;
    };

    const handleAddReview = (review: TextReview) => {
        setDishReviews((s) => {
            const reviews = [...s.reviews];
            reviews.push(review);
            let avgStars = 0;
            reviews.forEach((r) => { avgStars += r.stars; });
            avgStars /= reviews.length;
            return ({ id: s.id, stars: avgStars, reviews });
        });
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
                            starsReview={4}
                            onChange={() => undefined}
                        />
                        <div className="ms-2">
                            {`(based on ${dishReviews.reviews.length} reviews)`}
                        </div>
                    </Container>

                    <AddDishReview onAddReview={handleAddReview} />

                    <ListGroup variant="flush">
                        {dishReviews.reviews.map((r) => (
                            <ListGroup.Item>
                                <h3>{r.name}</h3>
                                <p>{r.text}</p>
                                <p>{r.purchaseDate}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4} />
            </Row>
        </Container>
    );
};

export default ProductPage;
