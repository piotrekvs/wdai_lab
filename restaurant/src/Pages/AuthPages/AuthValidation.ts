export const validateName = (val: string): boolean => {
    if (/^\w+/.test(val) && val.length > 1 && val.length < 30) {
        return true;
    }
    return false;
};

export const validateEmail = (val: string): boolean => {
    if (/^[^@\s]+@[^@\s]+.[^@\s]+$/.test(val) && val.length > 1 && val.length < 30) {
        return true;
    }
    return false;
};

export const validatePassword = (val1: string, val2: string): boolean => {
    if (/^[A-Za-z0-9!@#$%^&*();:<>?]+$/.test(val1)
        && val1.length >= 8 && val1.length < 30 && val1 === val2) {
        return true;
    }
    return false;
};
