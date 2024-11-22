export const AUTH_API = {
    INTROSPECT: "/auth/introspect",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    PROFILE: "/auth/profile",
    REGISTER_JOB_SEEKER: "/auth/register/job-seeker",
    REGISTER_RECRUITER: "/auth/register/recruiter",
    SEND_OTP: "/auth/send-otp",
    ACTIVE: "/auth/activate",
    RESET_PASSWORD: "/auth/reset-password",
    UPDATE_PASSWORD: "/auth/update-password",
};

export const JOBS_API = {
    GET_ALL: "/jobs",
    GET_ALL_ADMIN: "/jobs/admin",
    GET_ALL_POPULAR: "/jobs/popular",
    GET_BY_ID: "/jobs/",
    GET_BY_RECRUITER: "/jobs/recruiter",
    CREATE: "/jobs",
    SAVE: "/jobs/save",
    UPDATE_BY_ID: "/jobs/",
    HIDDEN: "/jobs/hidden",
};

export const JOBS_SAVED_API = {
    GET_ALL: "/jobs/saved",
    DELETE_ALL: "/jobs/saved",
};

export const JOBS_APPLY_API = {
    APPLY: "/jobs/apply",
    UPLOAD_CV: "/jobs/apply/upload-cv",
    GET_ALL: "/jobs/apply",
    GET_ALL_BY_POST_ID: "/jobs/apply/post/",
};

export const JOB_SEEKER_API = {
    UPDATE_AVATAR: "/job-seeker/update-avatar",
    UPDATE_PROFILE: "/job-seeker/update-profile",
    GET_ALL: "/job-seeker",
    GET_BY_ID: "/job-seeker/",
};

export const RECRUITERS_API = {
    UPDATE_PROFILE: "/recruiters/update-profile",
    UPLOAD_LOGO: "/recruiters/upload-logo",
    GET_ALL: "/recruiters",
};

export const USERS_API = {
    LOCK: "/users/lock",
};
