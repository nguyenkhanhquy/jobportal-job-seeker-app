import { getRequest } from "../api/request";
import { JOBS_API } from "../api/config";

export const getListJobs = async () => {
    return getRequest(JOBS_API.LIST);
};
