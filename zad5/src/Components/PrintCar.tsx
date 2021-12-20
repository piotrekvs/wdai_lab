import React from 'react';

type Props = {
    selectedCar: {
        brand: string;
        model: string;
        color: string;
    }
}

const PrintCar = (props: Props) => (
    <div>
        <h1>
            {`${props.selectedCar.brand} ${props.selectedCar.model} ${props.selectedCar.color}`}
        </h1>
    </div>
);

export default PrintCar;
