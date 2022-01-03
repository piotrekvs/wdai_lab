/* eslint-disable react/no-array-index-key */
import React from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { StarsReview } from '../../Types/Types';

type Props = {
    starsReview: StarsReview | undefined;
}

const DishStarsReview = (props: Props) => {
    const maxStars = 5;
    return (
        <div>
            {[...Array(maxStars)].map((_, i) => (
                (props.starsReview === undefined || props.starsReview.value < i)
                    ? <BsStar key={i} /> : <BsStarFill key={i} />
            ))}
        </div>
    );
};

export default DishStarsReview;
