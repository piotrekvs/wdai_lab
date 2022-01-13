import React, { useState } from 'react';
import {
    Button,
    Col,
    Form, FormControl, InputGroup, ListGroup, Row,
} from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { DishInput } from '../../Types/Types';

type Props = {
    ingredients: DishInput['ingredients'];
    addIngredient: (val: string) => void;
    deleteIngredient: (val: number) => void;
    ingredientsValidation: boolean;
    images: DishInput['images'];
    addImage: (val: string) => void;
    deleteImage: (val: number) => void;
    imagesValidation: boolean;
}

const AddDishForm2Step: React.FC<Props> = (props: Props) => {
    const [ingredient, setIngredient] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    return (
        <Form>
            <Row>
                <Col lg={5}>
                    <Form.Label htmlFor="basic-url">Add at least 2 ingredients</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="ingredient"
                            value={ingredient}
                            onChange={(e) => setIngredient(e.currentTarget.value)}
                            isInvalid={!props.ingredientsValidation}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                props.addIngredient(ingredient);
                                setIngredient('');
                            }}
                        >
                            Add
                        </Button>
                    </InputGroup>
                    <ListGroup>
                        {props.ingredients.map((i, idx) => (
                            <ListGroup.Item
                                className="d-flex justify-content-between align-items-start"
                                onClick={() => props.deleteIngredient(idx)}
                            >
                                {i.substring(0, 25)}
                                {i.length > 25 ? '...' : ''}
                                <BsFillTrashFill className="text-danger" />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col>
                    <Form.Label htmlFor="basic-url">
                        Images Urls (at least 1 url required)
                    </Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="url"
                            placeholder="url"
                            value={url}
                            onChange={(e) => setUrl(e.currentTarget.value)}
                            isInvalid={!props.imagesValidation}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                props.addImage(url);
                                setUrl('');
                            }}
                        >
                            Add
                        </Button>
                    </InputGroup>
                    <ListGroup>
                        {props.images.map((i, idx) => (
                            <ListGroup.Item
                                className="d-flex justify-content-between align-items-start"
                                onClick={() => props.deleteImage(idx)}
                            >
                                {i.substring(0, 30)}
                                {i.length > 30 ? '...' : ''}
                                <BsFillTrashFill className="text-danger" />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Form>
    );
};

export default AddDishForm2Step;
