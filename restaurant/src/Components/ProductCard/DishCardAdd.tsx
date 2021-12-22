import React from 'react';
import { Card } from 'react-bootstrap';
import { BsPlusSquareDotted } from 'react-icons/bs';

const DishCardAdd: React.FC = () => (
    <Card style={{ width: '18rem', margin: '1rem' }}>
        <Card.Body>
            <BsPlusSquareDotted size={64} />
        </Card.Body>
    </Card>
);

export default DishCardAdd;
