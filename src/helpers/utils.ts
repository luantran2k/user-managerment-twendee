import { Order } from "../stores/userStore";

export const updateField = <T, P extends keyof T>(
    object: T,
    field: P,
    value: T[P]
): void => {
    const newObject = structuredClone(object);
    newObject[field] = value;
};

export const getEmptyArray = <T>(
    numberOfInstance: number,
    emptyInstance?: T
): T[] => {
    return new Array(numberOfInstance).fill(emptyInstance);
};

export const compareStrings = (
    string1: string,
    string2: string,
    order: Order = "asc"
): number => {
    return order === "asc"
        ? string1.localeCompare(string2, "en")
        : string1.localeCompare(string2, "en") * -1;
};
