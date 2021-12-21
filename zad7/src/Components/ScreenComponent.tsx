import React from 'react';
import { Num, Operator } from '../Types/Types';
import './Style.css';

type Props = {
    firstNum: Num;
    secondNum: Num;
    result: Num;
    operator: Operator;
}

const ScreenComponent = (props: Props) => (
    <div className="screen-wrapper">
        <span>
            {props.firstNum.x}
            {' '}
        </span>
        <span>
            {props.operator.isEntered ? props.operator.s : ''}
            {' '}
        </span>
        <span>{props.secondNum.isEntered ? props.secondNum.x : ''}</span>
        <p>{props.result.isEntered ? `=${props.result.x}` : ''}</p>
    </div>
);

export default ScreenComponent;
