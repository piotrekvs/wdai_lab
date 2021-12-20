import { useState } from 'react';
import Child from './Child';
import './Style.css';

type Props = {};

const Parent = (props: Props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);

    const handleClick = () => {
        if (counter === 9) {
            setIsDisabled(true);
        }
        setCounter((counter) => (counter + 1))
    };

    const handleReset = () => {
        setCounter(0);
        setIsDisabled(false);
    };

    return (
        <div className='parent-wrapper'>
            <h1>Parent</h1>
            <h2>{counter}</h2>
            <Child disabled={isDisabled} onClick={handleClick} onReset={handleReset}/>
        </div>
    );
}

export default Parent
