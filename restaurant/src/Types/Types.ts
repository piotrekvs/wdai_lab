export type Dish = {
    id: string;
    name: string;
    cuisine: string;
    meal: string;
    category: string;
    ingredients: string[];
    quantity: number;
    priceEuro: number;
    description: string;
    images: string[];
};

export type DishInput = {
    id: string;
    name: string;
    cuisine: string;
    meal: string;
    category: string;
    ingredients: string[];
    quantity: string;
    priceEuro: string;
    description: string;
    images: string[];
};

export type DishValidation = { // (-1) - not used yet, 0 - invalid, 1 - valid
    id: -1 | 0 | 1;
    name: -1 | 0 | 1;
    cuisine: -1 | 0 | 1;
    meal: -1 | 0 | 1;
    category: -1 | 0 | 1;
    ingredients: -1 | 0 | 1;
    quantity: -1 | 0 | 1;
    priceEuro: -1 | 0 | 1;
    description: -1 | 0 | 1;
    images: -1 | 0 | 1;
};

export type StarsReview = {id: Dish['id'], value: number};

export type StarsReviews = StarsReview[];

export type CartContent = {
    totalPriceEuro: number;
    totalQuantity: number;
    orders: {id: Dish['id'], quantity: Dish['quantity']}[]
}
