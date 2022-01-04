import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { CartContent, Dish } from '../../../Types/Types';
import './CartPage.css';

type Props = {
    dishes: Dish[];
    cartContent: CartContent[];
    // eslint-disable-next-line react/no-unused-prop-types
    onAddToCart: (id: Dish['id'], quantity: Dish['quantity']) => void;
}

const CartPage: React.FC<Props> = (props: Props) => (
    <Container fluid className="container d-flex flex-column">
        <h1>Cart:</h1>
        {!props.cartContent.length && <h2>Empty</h2>}
        <ListGroup variant="flush">
            {props.cartContent.map((item) => {
                const dish = props.dishes.find((d) => d.id === item.id);
                return (
                    <ListGroup.Item>
                        {dish?.name}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    </Container>
);

export default CartPage;
