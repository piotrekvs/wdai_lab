/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Dish } from '../../Types/Types';

type Props = {
    currency: string;
    currencyFactor: number;
    dish: Dish;
};
type State = {};

export class DishCard extends React.Component<Props, State> {
    displayPrice() {
        const price = ((this.props.dish.priceEuro * this.props.currencyFactor) / 100).toFixed(2);
        return `${price} ${this.props.currency === 'euro' ? '€' : '$'}`;
    }

    render() {
        return (
            <Card style={{ width: '18rem', margin: '1rem' }}>
                <Card.Img height="200px" variant="top" src={this.props.dish.images[0]} />
                <Card.Body>
                    <Card.Title>{this.props.dish.name}</Card.Title>
                    <Card.Text>{this.props.dish.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        Cuisine:
                        {' '}
                        {this.props.dish.cuisine}
                    </ListGroupItem>
                    <ListGroupItem>
                        Category:
                        {' '}
                        {this.props.dish.category}
                    </ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Title>{this.displayPrice()}</Card.Title>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
        );
    }
}

export default DishCard;
