import axios from "axios";
import { getToken } from "../utils/authStorage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        const accessToken = await getToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;
