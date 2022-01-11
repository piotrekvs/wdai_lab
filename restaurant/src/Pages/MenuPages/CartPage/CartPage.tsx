import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { CartContent, Dish } from '../../../Types/Types';
import './CartPage.css';

type Props = {
    cartContent: CartContent[];
    // eslint-disable-next-line react/no-unused-prop-types
    onAddToCart: (id: Dish['id'], quantity: Dish['quantity'], dish: Dish) => void;
}

const CartPage: React.FC<Props> = (props: Props) => (
    <Container className="d-flex flex-column">
        <h1>Cart:</h1>
        {!props.cartContent.length && <h2>Empty</h2>}
        <ListGroup variant="flush">
            {props.cartContent.map((item) => (
                <ListGroup.Item key={item.dish.id}>
                    {`${item.dish.name} ${item.quantity}`}
                </ListGroup.Item>
            ))}
        </ListGroup>
    </Container>
);

export default CartPage;
