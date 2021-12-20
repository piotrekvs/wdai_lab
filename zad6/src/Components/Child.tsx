import './Style.css';

type Props = {
    disabled: boolean;
    onClick: () => void;
    onReset: () => void;
}

const Child = (props: Props) => {
    return (
        <div className='child-wrapper'>
            <h2>Child</h2>
            <button className='btn' disabled={props.disabled} onClick={props.onClick}>CLICK</button>
            <button className='btn' disabled={!props.disabled} onClick={props.onReset}>RESET</button>
        </div>
    )
}

export default Child
