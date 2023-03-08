import IUser from "../interfaces/User";
import request, { ApiResponse } from "../helpers/request";
import { IUserFilter } from "../stores/userStore";

const SEED = "my-seed";

export const getUsers = async (filter: Omit<IUserFilter, "sortBy">) => {
    const { data } = await request.get<ApiResponse<IUser[]>>("", {
        params: {
            ...filter,
            page: filter.page + 1, // Page api start from 1.
            seed: SEED,
        },
    });
    return data;
};

export const getAllUsers = async () => {
    const { data } = await request.get<ApiResponse<IUser[]>>("", {
        params: {
            page: 1,
            results: 100,
            seed: SEED,
        },
    });
    return data;
};
