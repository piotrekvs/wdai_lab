import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import DishCardInCart from '../../../Components/ProductCard/DishCardInCart';
import { CartContent } from '../../../Types/Types';
import './CartPage.css';

type Props = {
    cartContent: CartContent[];
}

const CartPage: React.FC<Props> = (props: Props) => (
    <Container className="d-flex flex-column">
        <h1>Cart:</h1>
        {!props.cartContent.length && <h2>Empty</h2>}
        <ListGroup>
            {props.cartContent.map((item) => (
                <ListGroup.Item key={item.dish.id}>
                    <DishCardInCart dish={item.dish} orderedQuantity={item.quantity} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    </Container>
);

export default CartPage;
