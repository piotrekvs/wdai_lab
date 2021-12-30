import React from 'react';
import './Style.css';

type Props = {
    onDigitInput: (x: number) => void;
    onOperatorInput: (s: string) => void;
    onChangeSign: () => void;
    onEquals: () => void;
    onClear: () => void;
}

const KeyboardComponent = (props: Props) => {
    const {
        onDigitInput, onOperatorInput, onClear, onEquals, onChangeSign,
    } = props;

    return (
        <div className="keyboard-wrapper">
            <button className="keybrd-btn-key key-0" onClick={() => onDigitInput(0)}>0</button>
            <button className="keybrd-btn-key" onClick={() => onDigitInput(7)}>7</button>
            <button className="keybrd-btn-key" onClick={() => onDigitInput(8)}>8</button>
            <button className="keybrd-btn-key" onClick={() => onDigitInput(9)}>9</button>
            <button className="keybrd-btn-key" onClick={() => onDigitInput(4)}>4</button>
            <button className="keybrd-btn-key" onClick={() => onDigitInput(5)}>5</button>
            <button className="keybrd-btn-key" onClick={() => onDigitInput(6)}>6</button>
            <button className="keybrd-btn-key" onClick={() => onDigitInput(3)}>3</button>
            <button className="keybrd-btn-key" onClick={() => onDigitInput(2)}>2</button>
            <button className="keybrd-btn-key" onClick={() => onDigitInput(1)}>1</button>
            <button className="keybrd-btn-key key-clear" onClick={onClear}>C</button>
            <button className="keybrd-btn-key key-plus" onClick={() => onOperatorInput('+')}>
                +
            </button>
            <button className="keybrd-btn-key key-minus" onClick={() => onOperatorInput('-')}>
                -
            </button>
            <button className="keybrd-btn-key key-div" onClick={() => onOperatorInput('/')}>
                /
            </button>
            <button className="keybrd-btn-key key-multi" onClick={() => onOperatorInput('*')}>
                *
            </button>
            <button className="keybrd-btn-key key-sign" onClick={onChangeSign}>+/-</button>
            <button className="keybrd-btn-key key-equal" onClick={onEquals}>=</button>
        </div>
    );
};

export default KeyboardComponent;
