/* eslint-disable react/no-array-index-key */
import React from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { StarsReview } from '../../Types/Types';

type Props = {
    starsReview: StarsReview | undefined;
    setValue: (val: StarsReview['value']) => void;
}

const DishStarsReview = (props: Props) => {
    const maxStars = 5;
    return (
        <div>
            {[...Array(maxStars)].map((_, i) => (
                (props.starsReview === undefined || props.starsReview.value < i)
                    ? <BsStar onClick={() => props.setValue(i)} key={i} />
                    : <BsStarFill onClick={() => props.setValue(i)} key={i} />
            ))}
        </div>
    );
};

export default DishStarsReview;
