import { DishInput } from '../../Types/Types';

export const validateDishName = (val: DishInput['name']): 0 | 1 => {
    if (/^\w+/.test(val) && val.length > 1 && val.length < 30) {
        return 1;
    }
    return 0;
};

export const validateDishCuisine = (val: DishInput['cuisine']): 0 | 1 => {
    if (/^\w/.test(val) && val.length > 1 && val.length < 30) {
        return 1;
    }
    return 0;
};

export const validateDishCategory = (val: DishInput['category']): 0 | 1 => {
    if (/^\w+/.test(val) && val.length > 1 && val.length < 30) {
        return 1;
    }
    return 0;
};

export const validateDishMeal = (val: DishInput['meal']): 0 | 1 => {
    const meals = ['breakfast', 'lunch', 'dinner', 'supper', 'dessert'];
    if (meals.includes(val)) {
        return 1;
    }
    return 0;
};

export const validateDishDescription = (val: DishInput['description']): 0 | 1 => {
    if (val.length > 5 && val.length < 100) {
        return 1;
    }
    return 0;
};

export const validateDishQuantity = (val: DishInput['quantity']): 0 | 1 => {
    if (/^\d+$/.test(val)) {
        return 1;
    }
    return 0;
};

export const validateDishPriceEuro = (val: DishInput['priceEuro']): 0 | 1 => {
    if (/^\d+([.|,]\d\d)?$/.test(val)) {
        return 1;
    }
    return 0;
};
