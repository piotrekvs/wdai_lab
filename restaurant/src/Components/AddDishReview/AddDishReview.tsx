import React, { useState } from 'react';
import {
    Form, Row, Col, Button,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { TextReview } from '../../Types/Types';
import { useAuth } from '../../Utils/AuthContext';
import DishStarsReview from '../DishStarsReview/DishStarsReview';
import {
    validateNick, validateName, validatePurchaseDate, validateStars, validateText,
} from './ReviewFormValidation';

type Props = {
    // eslint-disable-next-line react/no-unused-prop-types
    onAddReview: (newReview: TextReview) => void;
    dishId: string;
    isDisabled: boolean;
};

type State = {
    reviewForm: TextReview;
    isValid: {
        stars: boolean;
        nick: boolean;
        name: boolean;
        text: boolean;
        purchaseDate: boolean;
    };
};

const AddDishReview: React.FC<Props> = (props: Props) => {
    const authContext = useAuth();
    const [reviewForm, setReviewForm] = useState<State['reviewForm']>(() => ({
        _id: '',
        dishId: props.dishId,
        id: uuidv4(),
        stars: 0,
        nick: '',
        name: '',
        text: '',
        purchaseDate: '',
    }));
    const [isValid, setIsValid] = useState<State['isValid']>(() => ({
        stars: true,
        nick: true,
        name: true,
        text: true,
        purchaseDate: true,
    }));

    const handleAddDishReview = () => {
        const valid = {
            stars: validateStars(reviewForm.stars),
            nick: validateNick(reviewForm.nick),
            name: validateName(reviewForm.name),
            text: validateText(reviewForm.text),
            purchaseDate: validatePurchaseDate(reviewForm.purchaseDate),
        };
        setIsValid(() => valid);
        if (!Object.values(valid).includes(false)) {
            props.onAddReview(reviewForm);
            setReviewForm(() => ({
                _id: '',
                dishId: props.dishId,
                id: uuidv4(),
                stars: 0,
                nick: '',
                name: '',
                text: '',
                purchaseDate: '',
            }));
        }
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
                            isInvalid={!isValid.nick}
                            value={reviewForm.nick}
                            onChange={(val) => setReviewForm(
                                (s) => ({ ...s, nick: val.target.value }),
                            )}
                        />
                        <Form.Label htmlFor="fi-1">Your Nick</Form.Label>
                        <Form.Control.Feedback type="invalid">
                            Enter your nick.
                        </Form.Control.Feedback>
                    </Form.Floating>
                </Col>
                <Col>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            type="date"
                            id="fi-2"
                            isInvalid={!isValid.purchaseDate}
                            value={reviewForm.purchaseDate}
                            onChange={(val) => setReviewForm(
                                (s) => ({ ...s, purchaseDate: val.target.value }),
                            )}
                        />
                        <Form.Label htmlFor="fi-2">Date of Purchase</Form.Label>
                        <Form.Control.Feedback type="invalid">
                            Enter valid date.
                        </Form.Control.Feedback>
                    </Form.Floating>
                </Col>
                <Col>
                    <div className="d-flex flex-column align-items-center">
                        <DishStarsReview
                            starsReview={reviewForm.stars}
                            onChange={(stars) => setReviewForm(
                                (s) => ({ ...s, stars }),
                            )}
                        />
                        {!isValid.stars && <span className="text-danger">Fill stars</span>}
                    </div>
                </Col>
            </Row>
            <Form.Floating className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Name"
                    id="fi-1"
                    isInvalid={!isValid.name}
                    value={reviewForm.name}
                    onChange={(val) => setReviewForm(
                        (s) => ({ ...s, name: val.target.value }),
                    )}
                />
                <Form.Label htmlFor="fi-1">Name</Form.Label>
                <Form.Control.Feedback type="invalid">
                    Enter name.
                </Form.Control.Feedback>
            </Form.Floating>
            <Form.Floating className="mb-3">
                <Form.Control
                    as="textarea"
                    id="fi-3"
                    isInvalid={!isValid.text}
                    placeholder="Review"
                    style={{ height: '5rem' }}
                    value={reviewForm.text}
                    onChange={(val) => setReviewForm(
                        (s) => ({ ...s, text: val.target.value }),
                    )}
                />
                <Form.Label htmlFor="fi-3">Review</Form.Label>
                <Form.Control.Feedback type="invalid">
                    Review has to be between 50 and 500 characters.
                </Form.Control.Feedback>
            </Form.Floating>
            <div className="d-flex justify-content-end">
                <Button
                    disabled={authContext.user.isBanned || props.isDisabled}
                    onClick={handleAddDishReview}
                >
                    Dodaj opinię
                </Button>
            </div>
        </Form>
    );
};

export default AddDishReview;
