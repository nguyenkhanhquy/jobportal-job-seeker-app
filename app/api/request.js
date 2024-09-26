import axiosClient from "./axiosClient";

const handleError = (error) => {
    if (error.response) {
        return error.response.data; // Trả về dữ liệu lỗi từ server
    } else {
        console.error("Error:", error);
        throw error; // Nếu không có phản hồi lỗi từ server (lỗi mạng, v.v.)
    }
};

export const postRequest = async (url, body, config) => {
    try {
        const response = await axiosClient.post(url, body, config);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const getRequest = async (url, config) => {
    try {
        const response = await axiosClient.get(url, config);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const putRequest = async (url, body, config) => {
    try {
        const response = await axiosClient.put(url, body, config);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const deleteRequest = async (url, config) => {
    try {
        const response = await axiosClient.delete(url, config);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};
