import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dish, ICurrencyContext } from '../../Types/Types';
import { withCurrency } from '../../Utils/CurrencyContext';

type Props = {
    currencyContext: ICurrencyContext;
    dish: Dish;
    orderedQuantity: Dish['quantity'];
    onAddToCart: (id: Dish['id'], quantity: Dish['quantity'], dish: Dish) => void;
};

type State = {
    orderedQuantity: Dish['quantity'];
};

export class DishCard extends React.Component<Props, State> {
    state: State = {
        orderedQuantity: this.props.orderedQuantity,
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
        const { cnvFactor } = this.props.currencyContext;
        const { priceEuro } = this.props.dish;
        const price = ((priceEuro * this.props.orderedQuantity * cnvFactor) / 100).toFixed(2);
        return `${price} ${this.props.currencyContext.name === 'euro' ? '€' : '$'}`;
    };

    render() {
        return (
            <div className="d-flex justify-content-between">
                <Card.Title className="w-50">
                    <Link
                        to={`/menu/product/${this.props.dish.id}`}
                        state={{ dish: this.props.dish }}
                    >
                        {this.props.dish.name.toUpperCase()}
                    </Link>
                </Card.Title>
                <Card.Text className={this.isLittleAvailable()}>
                    Available to order:
                    {' '}
                    {this.props.dish.quantity - this.state.orderedQuantity}
                </Card.Text>

                <Card.Title>{this.displayPrice()}</Card.Title>
                <Card.Text>
                    Ordered:
                    {' '}
                    {this.state.orderedQuantity}
                </Card.Text>
            </div>
        );
    }
}

export default withCurrency(DishCard);
