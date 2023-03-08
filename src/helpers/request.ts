import axios, { Axios } from "axios";
import IInfo from "../interfaces/Info";

export interface ApiResponse<T> {
    results: T;
    info: IInfo;
}

export interface BaseFilter {
    page: number;
    results: number;
}

const request = axios.create({
    baseURL: "https://randomuser.me/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default request;
