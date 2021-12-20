export type CarColor = string

export type CarModels = {
    model: string;
    colors: CarColor[];
};

export type Car = {
    brand: string;
    models: CarModels[];
};
