import { TextReview } from '../../Types/Types';

export const validateStars = (val: TextReview['stars']): boolean => val > 0 && val <= 5;

export const validateNick = (val: TextReview['nick']): boolean => {
    if (/^\w+/.test(val) && val.length >= 1 && val.length < 30) {
        return true;
    }
    return false;
};

export const validateName = (val: TextReview['name']): boolean => {
    if (/^\w+/.test(val) && val.length >= 1 && val.length < 50) {
        return true;
    }
    return false;
};

export const validateText = (val: TextReview['text']): boolean => {
    if (val.length >= 50 && val.length <= 500) {
        return true;
    }
    return false;
};

export const validatePurchaseDate = (val: TextReview['purchaseDate']): boolean => {
    const purchasedate = new Date(val).getTime();
    const nowDate = new Date().getTime();
    if (purchasedate <= nowDate) {
        return true;
    }
    return false;
};
