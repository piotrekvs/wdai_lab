import React, { ChangeEvent, useState } from 'react';
import { Car } from '../types/Types';
import ColorSelector from './ColorSelector';
import DropDownList from './DropDownList';
import './Style.css';

type Props = {
    cars: Car[];
    selectCar: (brand: string, model: string, color: string) => void;
};
type State = {
    brand: { idx: number; name: string; };
    model: { idx: number; name: string; };
    color: string;
};

const SelectCar = (props: Props) => {
    const nothingSelected = '<none>';
    const [brand, setBrand] = useState<State['brand']>(() => ({ idx: 0, name: nothingSelected }));
    const [model, setModel] = useState<State['model']>(() => ({ idx: 0, name: nothingSelected }));
    const [color, setColor] = useState<State['color']>(() => (nothingSelected));

    const handleBrandSelection = (event: ChangeEvent<HTMLSelectElement>) => {
        props.selectCar('', '', '');
        const idx = props.cars.findIndex((val) => (val.brand === event.target.value));
        setBrand({ idx, name: event.target.value });
        setModel({ idx: 0, name: nothingSelected });
        setColor(nothingSelected);
    };

    const handleModelSelection = (event: ChangeEvent<HTMLSelectElement>) => {
        props.selectCar('', '', '');
        const idx = props.cars[brand.idx].models.findIndex(
            (val) => val.model === event.target.value,
        );
        setModel({ idx, name: event.target.value });
        setColor(nothingSelected);
    };

    const handleColorSelection = (selectedColor: string) => {
        if (selectedColor === nothingSelected) {
            props.selectCar('', '', '');
        } else {
            props.selectCar(brand.name, model.name, selectedColor);
        }
        setColor(selectedColor);
    };

    return (
        <div className="select-car-wrapper">
            <h2>Wybierz auto!</h2>
            <DropDownList
                values={[nothingSelected].concat(props.cars.map((val: Car) => val.brand))}
                value={brand.name}
                onSelection={handleBrandSelection}
            />
            {brand.name !== nothingSelected && (
                <DropDownList
                    values={[nothingSelected]
                        .concat(props.cars[brand.idx].models.map((val) => val.model))}
                    value={model.name}
                    onSelection={handleModelSelection}
                />
            )}
            {model.name !== nothingSelected && (
                <ColorSelector
                    values={props.cars[brand.idx].models[model.idx].colors}
                    value={color}
                    onSelection={handleColorSelection}
                />
            )}
        </div>
    );
};
export default SelectCar;
