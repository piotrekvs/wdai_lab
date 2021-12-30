import React, { useState } from 'react';
import './App.css';
import ScreenComponent from './Components/ScreenComponent';
import KeyboardComponent from './Components/KeyboardComponent';
import { Num, Operator } from './Types/Types';

type State = {
    num: Num;
    operator: Operator;
}

const App = () => {
    const clearOperator: State['operator'] = { s: '', isEntered: false };
    const clearNum: State['num'] = { x: 0, isEntered: false };
    const [result, setResult] = useState<State['num']>(clearNum);
    const [firstNum, setFirstNum] = useState<State['num']>(clearNum);
    const [secondNum, setSecondNum] = useState<State['num']>(clearNum);
    const [operator, setOperator] = useState<State['operator']>(clearOperator);

    const handleDigitInput = (x: number) => {
        if (!operator.isEntered) {
            setFirstNum((val) => ({ x: val.x * 10 + x, isEntered: true }));
        } else {
            setSecondNum((val) => ({ x: val.x * 10 + x, isEntered: true }));
        }
    };

    const handleChangeSign = () => {
        if (result.isEntered) {
            return;
        }
        if (!operator.isEntered) {
            setFirstNum((val) => ({ x: -val.x, isEntered: val.isEntered }));
        } else {
            setSecondNum((val) => ({ x: -val.x, isEntered: val.isEntered }));
        }
    };

    const handleOperatorInput = (s: string) => {
        if (result.isEntered) {
            const { x } = result;
            setResult(clearNum);
            setFirstNum({ x, isEntered: true });
            setSecondNum(clearNum);
        }
        setOperator({ s, isEntered: true });
    };

    const handleClear = () => {
        setOperator(clearOperator);
        setFirstNum(clearNum);
        setSecondNum(clearNum);
        setResult(clearNum);
    };

    const handleEquals = () => {
        if (!operator.isEntered || !firstNum.isEntered || !secondNum.isEntered) {
            return;
        }
        let x = 0;
        switch (operator.s) {
        case '/':
            if (secondNum.x !== 0) {
                x = firstNum.x / secondNum.x;
                setResult({ x, isEntered: true });
            }
            break;
        case '*':
            x = firstNum.x * secondNum.x;
            setResult({ x, isEntered: true });
            break;
        case '-':
            x = firstNum.x - secondNum.x;
            setResult({ x, isEntered: true });
            break;
        case '+':
            x = firstNum.x + secondNum.x;
            setResult({ x, isEntered: true });
            break;
        default:
            break;
        }
    };

    return (
        <div className="App">
            <ScreenComponent
                firstNum={firstNum}
                operator={operator}
                secondNum={secondNum}
                result={result}
            />
            <KeyboardComponent
                onDigitInput={handleDigitInput}
                onOperatorInput={handleOperatorInput}
                onChangeSign={handleChangeSign}
                onEquals={handleEquals}
                onClear={handleClear}
            />
        </div>
    );
};

export default App;
