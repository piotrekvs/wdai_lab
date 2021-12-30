import React from 'react';
import './Style.css';

type Props = {
    values: string[];
    value: string;
    onSelection: (color: string) => void;
}

const ColorSelector = (props: Props) => (
    <div className="color-selector-wrapper">
        {props.values.map((color) => (
            <div
                key={color}
                className="color-selector"
                style={{
                    backgroundColor: color,
                    borderColor: (color === props.value ? 'grey' : 'lightgray'),
                }}
                onClick={() => props.onSelection(color)}
            />
        ))}
    </div>
);

export default ColorSelector;
