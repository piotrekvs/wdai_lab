import { DishInput } from '../../Types/Types';

export const validateDishName = (val: DishInput['name']): boolean => {
    if (/^\w+/.test(val) && val.length > 1 && val.length < 30) {
        return true;
    }
    return false;
};

export const validateDishCuisine = (val: DishInput['cuisine']): boolean => {
    if (/^\w/.test(val) && val.length > 1 && val.length < 30) {
        return true;
    }
    return false;
};

export const validateDishCategory = (val: DishInput['category']): boolean => {
    if (/^\w+/.test(val) && val.length > 1 && val.length < 30) {
        return true;
    }
    return false;
};

export const validateDishMeal = (val: DishInput['meal']): boolean => {
    const meals = ['breakfast', 'lunch', 'dinner', 'supper', 'dessert'];
    if (meals.includes(val)) {
        return true;
    }
    return false;
};

export const validateDishDescription = (val: DishInput['description']): boolean => {
    if (val.length > 5 && val.length < 100) {
        return true;
    }
    return false;
};

export const validateDishQuantity = (val: DishInput['quantity']): boolean => {
    if (/^\d+$/.test(val)) {
        return true;
    }
    return false;
};

export const validateDishPriceEuro = (val: DishInput['priceEuro']): boolean => {
    if (/^\d+([.|,]\d\d)?$/.test(val)) {
        return true;
    }
    return false;
};

export const validateDishIngredient = (val: string): boolean => {
    if (/^\w+/.test(val) && val.length > 1 && val.length < 30) {
        return true;
    }
    return false;
};

export const validateDishImage = (val: string): boolean => {
    // eslint-disable-next-line max-len
    const expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}[.|:]{1}[a-z|\d]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
    const regex = new RegExp(expression);
    if (val.match(regex)) {
        return true;
    }
    return false;
};
