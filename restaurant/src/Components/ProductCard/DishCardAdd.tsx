import React from 'react';
import { Button } from 'react-bootstrap';
import { BsPlusSquareDotted } from 'react-icons/bs';

type Props = {
    onClick: () => void;
};

const DishCardAdd: React.FC<Props> = (props: Props) => (
    <Button
        variant="outline-primary"
        style={{ width: '18rem', margin: '1rem' }}
        onClick={props.onClick}
    >
        <BsPlusSquareDotted size={64} />
    </Button>
);

export default DishCardAdd;
