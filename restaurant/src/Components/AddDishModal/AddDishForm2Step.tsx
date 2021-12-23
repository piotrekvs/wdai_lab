import React from 'react';
import {
    Form,
} from 'react-bootstrap';
import { DishInput } from '../../Types/Types';

type Props = {
    ingredients: DishInput['ingredients'];
    images: DishInput['images'];
    addIngredient: (val: string) => void;
    addImage: (val: string) => void;
}

const AddDishForm2Step: React.FC<Props> = (props: Props) => (
    <Form />
);

export default AddDishForm2Step;
