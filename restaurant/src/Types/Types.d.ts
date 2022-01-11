export type User = {
    isLoggedIn: boolean;
    id: string;
    name: string;
    email: string;
    loggedInAs: 'guest' | 'client' | 'manager' | 'admin';
    [key: string]: string | boolean;
};

interface IAuthContext {
    user: User;
    signIn: (jwtToken: string, callback?: VoidFunction) => void;
    signOut: () => void;
}

// eslint-disable-next-line max-len
export type WithAuthHOC = <Props extends {authContext: IAuthContext}, T extends Component<Props>>(ChildComponent: (new(p: Props) => T) | FunctionComponent<Props>) => FunctionComponent<Omit<Props, 'authContext'>>;

interface ICurrencyContext {
    name: 'euro' | 'usd';
    cnvFactor: number;
}

// eslint-disable-next-line max-len
export type WithCurrencyHOC = <Props extends {currencyContext: ICurrencyContext}, T extends Component<Props>>(ChildComponent: (new(p: Props) => T) | FunctionComponent<Props>) => FunctionComponent<Omit<Props, 'currencyContext'>>;

export type Dish = {
    _id: string;
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

export type TextReview = {
    _id: string;
    dishId: string;
    id: string;
    stars: number;
    nick: string;
    name: string;
    text: string;
    purchaseDate: string;
}

export type DishReview = {
    id: Dish['id'];
    stars: number;
    reviews: TextReview[]
};

export type CartContent = {
    id: string;
    quantity: number;
    dish: Dish;
}

export type Pagination = {
    itemsLength: number;
    itemsOnPage: number;
    pages: number;
    active: number;
};
