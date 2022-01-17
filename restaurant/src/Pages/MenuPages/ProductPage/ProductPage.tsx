/* eslint-disable react/no-unused-prop-types */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
import { useAuth } from '../../../Utils/AuthContext';
import './ProductPage.css';

const getReviews = (dishId: Dish['id']) => axios({
    url: '/restaurant_wdai/reviews',
    method: 'get',
    params: { dishId },
});

const addReview = (review: TextReview) => axios({
    url: '/restaurant_wdai/review/new',
    method: 'post',
    data: review,
});

type LocationState = {
    dish: Dish;
}

type Props = {
    cartContent: CartContent[];
    onAddToCart: (id: Dish['id'], quantity: Dish['quantity'], dish: Dish) => void;
};

type State = {
    review: DishReview;
}

const ProductPage: React.FC<Props> = (props: Props) => {
    const authContext = useAuth();
    const location = useLocation();
    const { dish } = location.state as LocationState;
    const [dishReviews, setDishReviews] = useState<State['review']>(() => ({
        id: '',
        stars: 0,
        reviews: [],
    }));

    const calculateStars = (reviews: TextReview[]) => {
        let avgStars = 0;
        reviews.forEach((r) => { avgStars += r.stars; });
        return avgStars / reviews.length;
    };

    const fetchReviews = async () => {
        try {
            const reviewsRes = await getReviews(dish.id);
            if (reviewsRes.data.counter > 0) {
                setDishReviews((s) => {
                    const stars = calculateStars(reviewsRes.data.reviews);
                    return ({ ...s, stars, reviews: reviewsRes.data.reviews });
                });
            }
        } catch (e) {
            // TODO: handle errors
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

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
        addReview(review);
    };

    return (
        <Container className="d-grid">
            <Row className="row-container">
                <Col md={8}>
                    <Link to="/menu">
                        <Button className="mb-1">Powrót do menu</Button>
                    </Link>
                    <Carousel className="carousel-wrapper">
                        {dish.images.map((image, idx) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Carousel.Item className="carousel-item-wrapper" key={`img-${idx}`}>
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

                    {!authContext.user.isBanned
                    && <AddDishReview onAddReview={handleAddReview} dishId={dish.id} />}

                    <ListGroup variant="flush">
                        {dishReviews.reviews.map((r) => (
                            <ListGroup.Item key={r.id}>
                                <h2>{`Nick: ${r.nick}`}</h2>
                                <h3>{r.name}</h3>
                                <p>{r.text}</p>
                                <p>{`Date of purchase: ${r.purchaseDate}`}</p>
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
