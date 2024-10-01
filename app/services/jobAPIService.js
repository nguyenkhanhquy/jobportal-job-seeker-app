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
