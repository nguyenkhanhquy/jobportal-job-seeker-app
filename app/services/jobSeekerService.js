import axiosClient from "../api/axiosClient";
import { JOB_SEEKER_API } from "../api/constants";

export const updateProfile = async (profile) => {
    return axiosClient.post(JOB_SEEKER_API.UPDATE_PROFILE, {
        fullName: profile.fullName,
        address: profile.address,
        phone: profile.phone,
        dob: profile.dob,
        // ? (() => {
        //       const date = new Date(profile.dob); // Chuyển thành Date object
        //       date.setDate(date.getDate() + 1); // Tăng thêm 1 ngày
        //       return date.toISOString().split("T")[0]; // Định dạng YYYY-MM-DD
        //   })()
        // : null,
        workExperience: profile.workExperience,
    });
};

export const getAllJobSeekers = async (page, size, search) => {
    return axiosClient.get(JOB_SEEKER_API.GET_ALL, {
        params: {
            page: page,
            size: size,
            query: search,
        },
    });
};

export const updateAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append("avatar", {
        uri: avatar.uri,
        type: avatar.type,
        name: avatar.name,
    });

    return axiosClient.post(JOB_SEEKER_API.UPDATE_AVATAR, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
