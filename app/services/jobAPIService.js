import { getRequest } from "../api/request";
import { JOBS_API } from "../api/config";

export const getListJobs = async (page, size) => {
    return getRequest(JOBS_API.LIST, {
        params: {
            page: page ?? 1,
            size: size ?? 5,
        },
    });
};

export const getSearchJobs = async (query, page, size) => {
    return getRequest(JOBS_API.SEARCH, {
        params: {
            query: query ?? null,
            page: page ?? 1,
            size: size ?? 5,
        },
    });
};

export const getFilterJobs = async (tilte, address, page, size) => {
    return getRequest(JOBS_API.FILTER, {
        params: {
            tilte: tilte ?? null,
            address: address ?? null,
            page: page ?? 1,
            size: size ?? 5,
        },
    });
};
