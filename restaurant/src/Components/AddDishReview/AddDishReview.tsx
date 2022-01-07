import React, { useEffect, useState } from 'react';
import {
    Form, Row, Col, Button,
} from 'react-bootstrap';
import { TextReview } from '../../Types/Types';
import DishStarsReview from '../DishStarsReview/DishStarsReview';

type Props = {
    onAddReview: (newReview: TextReview) => void;
};

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

    const handleAddDishReview = () => {
        // TODO: checks;
        props.onAddReview(reviewForm);
        setReviewForm(() => ({
            stars: 0,
            name: '',
            text: '',
            purchaseDate: '',
        }));
    };

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
                        <Form.Control
                            type="date"
                            id="fi-2"
                            value={reviewForm.purchaseDate}
                            onChange={(val) => setReviewForm(
                                (s) => ({ ...s, purchaseDate: val.target.value }),
                            )}
                        />
                        <Form.Label htmlFor="fi-2">Date of Purchase</Form.Label>
                    </Form.Floating>
                </Col>
                <Col>
                    <div className="d-flex justify-content-center">
                        <DishStarsReview
                            starsReview={reviewForm.stars}
                            onChange={(stars) => setReviewForm(
                                (s) => ({ ...s, stars }),
                            )}
                        />
                    </div>
                </Col>
            </Row>
            <Form.Floating className="mb-3">
                <Form.Control
                    as="textarea"
                    id="fi-3"
                    placeholder="Review"
                    style={{ height: '5rem' }}
                    value={reviewForm.text}
                    onChange={(val) => setReviewForm(
                        (s) => ({ ...s, text: val.target.value }),
                    )}
                />
                <Form.Label htmlFor="fi-3">Review</Form.Label>
            </Form.Floating>
            <div className="d-flex justify-content-end">
                <Button onClick={handleAddDishReview}>Dodaj opinię</Button>
            </div>
        </Form>
    );
};

export default AddDishReview;
