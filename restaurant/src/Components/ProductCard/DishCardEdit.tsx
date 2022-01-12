import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsXLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Dish } from '../../Types/Types';
import { useCurrency } from '../../Utils/CurrencyContext';

type Props = {
    dish: Dish;
    onDelete: () => void;
}

const DishCardEdit: React.FC<Props> = (props: Props) => {
    const currencyContext = useCurrency();

    const displayPrice = () => {
        const { cnvFactor } = currencyContext;
        const { priceEuro } = props.dish;
        const price = ((priceEuro * cnvFactor) / 100).toFixed(2);
        return `${price} ${currencyContext.name === 'euro' ? '€' : '$'}`;
    };

    return (
        <Card style={{ width: '18rem', margin: '1rem' }}>
            <Button
                className="position-absolute top-0 end-0 p-0"
                variant="danger"
                onClick={props.onDelete}
            >
                <BsXLg size={24} />
            </Button>
            <Link
                to={`product/${props.dish.id}`}
                state={{ dish: props.dish }}
            >
                <Card.Img
                    height="180px"
                    variant="top"
                    src={props.dish.images[0]}
                />
            </Link>
            <Card.Body>
                <Card.Title>{props.dish.name.toUpperCase()}</Card.Title>
                <Card.Text>{props.dish.description}</Card.Text>
            </Card.Body>
            <Card.Body className="d-flex justify-content-between align-items-center">
                <Card.Title>{displayPrice()}</Card.Title>
                <Button
                    className="m-1"
                >
                    Edytuj
                </Button>
            </Card.Body>

        </Card>
    );
};

export default DishCardEdit;
