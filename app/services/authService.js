import axiosClient from "../api/axiosClient";
import { AUTH_API } from "../api/constants";

export const introspect = async (accessToken) => {
    return axiosClient.post(AUTH_API.INTROSPECT, {
        token: accessToken,
    });
};

export const login = async (email, password) => {
    return axiosClient.post(AUTH_API.LOGIN, {
        email: email,
        password: password,
    });
};

export const logout = async (accessToken) => {
    return axiosClient.post(AUTH_API.LOGOUT, {
        token: accessToken,
    });
};

export const registerJobSeeker = async (jobSeeker) => {
    return axiosClient.post(AUTH_API.REGISTER_JOB_SEEKER, {
        email: jobSeeker.email,
        password: jobSeeker.password,
        fullName: jobSeeker.fullName,
    });
};

export const registerRecruiter = async (recruiter) => {
    return axiosClient.post(AUTH_API.REGISTER_RECRUITER, {
        email: recruiter.email,
        password: recruiter.password,
        company: recruiter.company,
        name: recruiter.name,
        position: recruiter.position,
        phone: recruiter.phone,
        recruiterEmail: recruiter.recruiterEmail,
    });
};

export const sendOTP = async (email) => {
    return axiosClient.post(AUTH_API.SEND_OTP, {
        email: email,
    });
};

export const activeAccount = async (email, otp) => {
    return axiosClient.post(AUTH_API.ACTIVE, {
        email: email,
        otp: otp,
    });
};

export const resetPassword = async (email, otp, newPassword) => {
    return axiosClient.post(AUTH_API.RESET_PASSWORD, {
        email: email,
        otp: otp,
        newPassword: newPassword,
    });
};

export const updatePassword = async (password, newPassword) => {
    return axiosClient.post(AUTH_API.UPDATE_PASSWORD, {
        password: password,
        newPassword: newPassword,
    });
};

export const getAuthUser = async () => {
    return axiosClient.get(AUTH_API.ME);
};

export const getAuthProfile = async () => {
    return axiosClient.get(AUTH_API.PROFILE);
};
