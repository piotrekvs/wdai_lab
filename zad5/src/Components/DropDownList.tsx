import React, { ChangeEvent } from 'react';
import './Style.css';

type Props = {
    values: string[];
    value: string;
    onSelection: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const DropDownList = (props: Props) => (
    <select
        className="drop-down-list"
        value={props.value}
        onChange={props.onSelection}
    >
        {props.values.map((val) => (
            <option value={val} key={val}>{val}</option>
        ))}
    </select>
);

export default DropDownList;
