import { create } from "zustand";
import { BaseFilter } from "../helpers/request";

export type Column = "full-name" | "username";
export type Order = "asc" | "desc";

export interface IUserFilter extends BaseFilter {
    sortBy?: {
        field?: Column;
        order?: Order;
    };
}

export interface IUserStoreState extends IUserFilter {}

export interface IUserStore extends IUserStoreState {
    updateUserStore<Field extends keyof IUserStoreState>(
        field: Field,
        value: IUserStoreState[Field]
    ): void;
}

export const useUserStore = create<IUserStore>()((set) => ({
    page: 0,
    sortBy: {},
    results: 10,
    updateUserStore: (field, value) => {
        set((state) => ({ ...state, [field]: value }));
    },
}));
