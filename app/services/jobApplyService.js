import axiosClient from "../api/axiosClient";
import { JOBS_APPLY_API } from "../api/constants";

export const applyJob = async (jobPostId, coverLetter, cv) => {
    return axiosClient.post(JOBS_APPLY_API.APPLY, {
        jobPostId: jobPostId,
        coverLetter: coverLetter,
        cv: cv,
    });
};

export const uploadCV = async (cv) => {
    const formData = new FormData();
    formData.append("cv", {
        uri: cv.uri,
        type: cv.type,
        name: cv.name,
    });

    return axiosClient.post(JOBS_APPLY_API.UPLOAD_CV, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getAllJobApplied = async (page, size, search) => {
    return axiosClient.get(JOBS_APPLY_API.GET_ALL, {
        params: {
            page: page,
            size: size,
            query: search,
        },
    });
};

export const getAllJobAppliedByPostId = async (postId) => {
    return axiosClient.get(JOBS_APPLY_API.GET_ALL_BY_POST_ID + postId);
};
