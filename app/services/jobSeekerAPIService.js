import { postRequest } from "../api/request";
import { JOB_SEEKER_API } from "../api/config";

export const updateAvatar = async (token, avatar) => {
    const formData = new FormData();
    formData.append("avatar", {
        uri: avatar.uri,
        type: avatar.type,
        name: avatar.name,
    });

    return postRequest(JOB_SEEKER_API.UPDATE_AVATAR, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateProfile = async (token, data) => {
    return postRequest(JOB_SEEKER_API.UPDATE_PROFILE, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
