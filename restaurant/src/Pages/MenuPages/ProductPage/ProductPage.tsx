import React, { useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { CartContent, Dish, StarsReviews } from '../../../Types/Types';
import './ProductPage.css';

type LocationState = {
    dish: Dish;
}

type Props = {
    starsReviews: StarsReviews;
    cartContent: CartContent[];
    onAddToCart: (id: Dish['id'], quantity: Dish['quantity']) => void;
};

const ProductPage: React.FC<Props> = (props: Props) => {
    const location = useLocation();
    const { dish } = location.state as LocationState;

    return (
        <Container>
            <Carousel className="carousel-wrapper">
                {dish.images.map((image) => (
                    <Carousel.Item className="carousel-wrapper">
                        <img
                            className="d-block img-wrapper"
                            src={image}
                            alt="slide"
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default ProductPage;
