import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

axiosClient.interceptors.request.use(async (config) => {
    // Xử lý token ...
    return config;
});

export default axiosClient;
