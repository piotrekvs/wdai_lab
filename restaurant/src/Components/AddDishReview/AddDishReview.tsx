import React, { useState } from 'react';
import {
    Form, Row, Col, Button,
} from 'react-bootstrap';
import { TextReview } from '../../Types/Types';
import DishStarsReview from '../DishStarsReview/DishStarsReview';

type Props = {};

type State = {
    reviewForm: TextReview;
};

const AddDishReview: React.FC<Props> = (props: Props) => {
    const [reviewForm, setReviewForm] = useState<State['reviewForm']>(() => ({
        stars: 0,
        name: '',
        text: '',
        purchaseDate: '',
    }));

    return (
        <Form className="border p-2">
            <Row>
                <Col>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Your Nick"
                            id="fi-1"
                            value={reviewForm.name}
                            onChange={(val) => setReviewForm(
                                (s) => ({ ...s, name: val.target.value }),
                            )}
                        />
                        <Form.Label htmlFor="fi-1">Your Nick</Form.Label>
                    </Form.Floating>
                </Col>
                <Col>
                    <Form.Floating className="mb-3">
                        <Form.Control type="date" />
                        <Form.Label>Date of Purchase</Form.Label>
                    </Form.Floating>
                </Col>
                <Col>
                    <div className="d-flex justify-content-center">
                        <DishStarsReview starsReview={3} onChange={() => undefined} />
                    </div>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={2} placeholder="Review" />
            </Form.Group>
            <div className="d-flex justify-content-end">
                <Button>Dodaj opinię</Button>
            </div>
        </Form>
    );
};

export default AddDishReview;
