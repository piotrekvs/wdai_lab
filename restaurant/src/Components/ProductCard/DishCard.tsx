/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
    Button, Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { BsPlusLg, BsDashLg, BsXLg } from 'react-icons/bs';
import { Dish } from '../../Types/Types';

type Props = {
    currency: string;
    currencyFactor: number;
    dish: Dish;
    changeOrderedQuantity: (x: number) => void;
};
type State = {
    orderedQuantity: number;
};

export class DishCard extends React.Component<Props, State> {
    state: State = {
        orderedQuantity: 0,
    };

    handleAddBtn(x: number) {
        this.setState((s) => ({ orderedQuantity: s.orderedQuantity + x }));
        this.props.changeOrderedQuantity(x);
    }

    isLittleAvailable() {
        if (this.props.dish.quantity - this.state.orderedQuantity <= 0) {
            return 'bg-danger';
        } if (this.props.dish.quantity - this.state.orderedQuantity <= 3) {
            return 'bg-warning';
        }
        return 'bg-white';
    }

    displayPrice() {
        const price = ((this.props.dish.priceEuro * this.props.currencyFactor) / 100).toFixed(2);
        return `${price} ${this.props.currency === 'euro' ? '€' : '$'}`;
    }

    render() {
        return (
            <Card style={{ width: '18rem', margin: '1rem' }}>
                <BsXLg
                    className="position-absolute top-0 end-0 bg-danger text-white"
                    size={24}
                />
                <Card.Img height="180px" variant="top" src={this.props.dish.images[0]} />
                <Card.Body>
                    <Card.Title>{this.props.dish.name.toUpperCase()}</Card.Title>
                    <Card.Text>{this.props.dish.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        Cuisine:
                        {' '}
                        {this.props.dish.cuisine.toUpperCase()}
                    </ListGroupItem>
                    <ListGroupItem>
                        Category:
                        {' '}
                        {this.props.dish.category}
                    </ListGroupItem>
                    <ListGroupItem
                        className={this.isLittleAvailable()}
                    >
                        Available to order:
                        {' '}
                        {this.props.dish.quantity - this.state.orderedQuantity}
                    </ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Title>{this.displayPrice()}</Card.Title>
                    <Button
                        className="m-1"
                        disabled={this.state.orderedQuantity <= 0}
                        onClick={() => this.handleAddBtn(-1)}
                    >
                        <BsDashLg />
                    </Button>
                    <Button
                        className="m-1"
                        disabled={this.state.orderedQuantity >= this.props.dish.quantity}
                        onClick={() => this.handleAddBtn(1)}
                    >
                        <BsPlusLg />
                    </Button>
                    <Card.Text className="d-inline m-1">
                        Added:
                        {' '}
                        {this.state.orderedQuantity}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default DishCard;
