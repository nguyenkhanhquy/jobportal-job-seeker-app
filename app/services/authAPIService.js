import { getRequest, postRequest } from "../api/request";
import { AUTH_API } from "../api/config";

export const register = async (email, fullName, password) => {
    const data = { email, fullName, password };
    return postRequest(AUTH_API.REGISTER, data);
};

export const login = async (email, password) => {
    const data = { email, password };
    return postRequest(AUTH_API.LOGIN, data);
};

export const logout = async (token) => {
    const data = { token };
    return postRequest(AUTH_API.LOGOUT, data);
};

export const introspect = async (token) => {
    const data = { token };
    return postRequest(AUTH_API.INTROSPECT, data);
};

export const sendOtp = async (email) => {
    const data = { email };
    return postRequest(AUTH_API.SEND_OTP, data);
};

export const resetPassword = async (email, newPassword, otp) => {
    const data = { email, newPassword, otp };
    return postRequest(AUTH_API.RESET_PASSWORD, data);
};

export const activate = async (token, otp) => {
    const data = { otp };
    return postRequest(AUTH_API.ACTIVATE, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updatePassword = async (token, password, newPassword) => {
    const data = { password, newPassword };
    return postRequest(AUTH_API.UPDATE_PASSWORD, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getCurrentProfile = async () => {
    return getRequest(AUTH_API.GET_CURRENT_PROFILE);
};
