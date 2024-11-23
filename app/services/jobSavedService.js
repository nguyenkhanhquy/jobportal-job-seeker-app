import axiosClient from "../api/axiosClient";
import { JOBS_SAVED_API } from "../api/constants";

export const getAllJobSaved = async (page, size, search) => {
    return axiosClient.get(JOBS_SAVED_API.GET_ALL, {
        params: {
            page: page,
            size: size,
            search: search,
        },
    });
};

export const deleteAllJobSaved = async () => {
    return axiosClient.delete(JOBS_SAVED_API.DELETE_ALL);
};
