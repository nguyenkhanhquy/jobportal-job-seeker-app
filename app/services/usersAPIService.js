import { getRequest } from "../api/request";
import { USERS_API } from "../api/config";

export const getUsersInfo = async (token) => {
    return getRequest(USERS_API.MY_INFO, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
