/* eslint-disable react/no-array-index-key */
import React from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';

type Props = {
    starsReview: number;
    onChange: (x: number) => void;
}

const DishStarsReview = (props: Props) => {
    const maxStars = 5;
    return (
        <div>
            {[...Array(maxStars)].map((_, i) => (
                props.starsReview > i
                    ? <BsStarFill size={24} key={i} onClick={() => props.onChange(i)} />
                    : <BsStar size={24} key={i} onClick={() => props.onChange(i)} />
            ))}
        </div>
    );
};

export default DishStarsReview;
