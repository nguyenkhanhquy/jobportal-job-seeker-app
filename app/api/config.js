export const AUTH_API = {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    INTROSPECT: "/auth/introspect",
    SEND_OTP: "/auth/send-otp",
    RESET_PASSWORD: "/auth/reset-password",
    ACTIVATE: "/auth/activate",
    UPDATE_PASSWORD: "/auth/update-password",
};

export const USERS_API = {
    MY_INFO: "/users/my-info",
};

export const JOBS_API = {
    LIST: "/jobs",
    DETAILS: "/jobs/:id",
    APPLY: "/jobs/:id/apply",
    SEARCH: "/jobs/search",
    FILTER: "/jobs/filter",
};

export const JOB_SEEKER_API = {
    UPDATE_AVATAR: "/job-seeker/update-avatar",
    UPDATE_PROFILE: "/job-seeker/update-profile",
};
