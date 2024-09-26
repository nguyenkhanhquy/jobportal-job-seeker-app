import { postRequest } from "../api/request";
import { AUTH_API } from "../api/config";

export const register = async (body) => {
    return postRequest(AUTH_API.REGISTER, body);
};

export const login = async (body) => {
    return postRequest(AUTH_API.LOGIN, body);
};

export const logout = async (body) => {
    return postRequest(AUTH_API.LOGOUT, body);
};
