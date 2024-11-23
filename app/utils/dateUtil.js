export const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("vi-VN", options);
};

export const convertDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
};
