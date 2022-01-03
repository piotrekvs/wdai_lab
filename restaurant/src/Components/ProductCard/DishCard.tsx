/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
    Button, Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { BsPlusLg, BsDashLg, BsXLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Dish, StarsReview } from '../../Types/Types';
import DishStarsReview from '../DishStarsReview/DishStarsReview';

type Props = {
    dish: Dish;
    currency: string;
    currencyFactor: number;
    borderColor: string;
    onDelete: () => void;
    starsReview: StarsReview | undefined;
};
type State = {
    orderedQuantity: number;
};

export class DishCard extends React.Component<Props, State> {
    state: State = {
        orderedQuantity: 0,
    };

    handleAddBtn = (x: number) => {
        this.setState((s) => ({ orderedQuantity: s.orderedQuantity + x }));
    };

    handleSubtractBtn = () => {
        this.handleAddBtn(-this.state.orderedQuantity);
        this.props.onDelete();
    };

    isLittleAvailable = () => {
        if (this.props.dish.quantity - this.state.orderedQuantity <= 0) {
            return 'bg-danger';
        } if (this.props.dish.quantity - this.state.orderedQuantity <= 3) {
            return 'bg-warning';
        }
        return 'bg-white';
    };

    displayPrice = () => {
        const price = ((this.props.dish.priceEuro * this.props.currencyFactor) / 100).toFixed(2);
        return `${price} ${this.props.currency === 'euro' ? '€' : '$'}`;
    };

    render() {
        return (
            <Card
                border={this.props.borderColor}
                style={{ width: '18rem', margin: '1rem' }}
            >
                <Button
                    className="position-absolute top-0 end-0 p-0"
                    variant="danger"
                    onClick={this.handleSubtractBtn}
                >
                    <BsXLg size={24} />
                </Button>
                <Link to={`product/${this.props.dish.id}`}>
                    <Card.Img height="180px" variant="top" src={this.props.dish.images[0]} />
                </Link>
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
                    <div className="d-flex justify-content-between align-items-start">
                        <Card.Title>{this.displayPrice()}</Card.Title>
                        <DishStarsReview starsReview={this.props.starsReview} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button
                            className="m-1"
                            disabled={this.state.orderedQuantity <= 0}
                            onClick={() => this.handleAddBtn(-1)}
                        >
                            <BsDashLg />
                        </Button>
                        <Card.Text className="d-inline m-1">
                            Added:
                            {' '}
                            {this.state.orderedQuantity}
                        </Card.Text>
                        <Button
                            className="m-1"
                            disabled={this.state.orderedQuantity >= this.props.dish.quantity}
                            onClick={() => this.handleAddBtn(1)}
                        >
                            <BsPlusLg />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default DishCard;
