import React from 'react';
import { useParams } from 'react-router-dom';
import { CartContent, Dish, StarsReviews } from '../../../Types/Types';

type Props = {
    dishes: Dish[];
    cartContent: CartContent;
    starsReviews: StarsReviews;
}

type State = {}

const ProductPage = (props: Props) => {
    const { productId } = useParams();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const futureFunction = () => {

    };

    return (
        <div className="container">
            <h1>{productId}</h1>
        </div>
    );
};

export default ProductPage;
