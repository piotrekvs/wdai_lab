import React from 'react';
import { CartContent } from '../../../Types/Types';

type Props = {
    cartContent: CartContent;
}

type State = {}

// eslint-disable-next-line react/prefer-stateless-function
export class CartPage extends React.Component<Props, State> {
    render() {
        return (
            <div className="container">
                <h1>Cart</h1>
            </div>
        );
    }
}

export default CartPage;
