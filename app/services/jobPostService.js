import axiosClient from "../api/axiosClient";
import { JOBS_API } from "../api/constants";

export const getAllJobPostsAdmin = async (page, size, search, order) => {
    return axiosClient.get(JOBS_API.GET_ALL_ADMIN, {
        params: {
            page: page,
            size: size,
            query: search,
            order: order,
        },
    });
};

export const getAllJobPosts = async (page, size, query, order) => {
    return axiosClient.get(JOBS_API.GET_ALL, {
        params: {
            page: page,
            size: size,
            query: query,
            order: order,
        },
    });
};

export const getPopularJobPosts = async () => {
    return axiosClient.get(JOBS_API.GET_ALL_POPULAR, {
        params: {
            page: 1,
            size: 10,
        },
    });
};

export const getJobPostById = async (jobPostId) => {
    return axiosClient.get(JOBS_API.GET_BY_ID + jobPostId);
};

export const getJobPostsByRecruiter = async (page, size, search) => {
    return axiosClient.get(JOBS_API.GET_BY_RECRUITER, {
        params: {
            page: page,
            size: size,
            query: search,
        },
    });
};

export const createJobPost = async (jobPost) => {
    return axiosClient.post(JOBS_API.CREATE, jobPost);
};

export const saveJobPost = async (jobPostId) => {
    return axiosClient.post(JOBS_API.SAVE, {
        id: jobPostId,
    });
};

export const updateJobPost = async (jobPostId, jobPost) => {
    return axiosClient.patch(JOBS_API.UPDATE_BY_ID + jobPostId, {
        title: jobPost.title,
        type: jobPost.type,
        remote: jobPost.remote,
        description: jobPost.description,
        salary: jobPost.salary,
        quantity: jobPost.quantity,
        expiryDate: jobPost.expiryDate,
        requirements: jobPost.requirements,
        benefits: jobPost.benefits,
        address: jobPost.address,
    });
};

export const hiddenJobPost = async (jobPostId) => {
    return axiosClient.post(JOBS_API.HIDDEN, {
        id: jobPostId,
    });
};
