import * as SecureStore from "expo-secure-store";

// Hàm lưu trữ token
export const saveToken = async (token) => {
    try {
        await SecureStore.setItemAsync("userToken", token);
        console.log("Token đã được lưu thành công: " + token);
    } catch (error) {
        console.error("Lỗi khi lưu token:", error);
    }
};

// Hàm lấy token đã lưu trữ
export const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
            console.log("Token đã lưu:", token);
        } else {
            console.log("Không có token nào được lưu.");
        }
        return token;
    } catch (error) {
        console.error("Lỗi khi lấy token:", error);
        return null;
    }
};

// Hàm xóa token đã lưu trữ
export const deleteToken = async () => {
    try {
        await SecureStore.deleteItemAsync("userToken");
        console.log("Token đã được xóa thành công.");
    } catch (error) {
        console.error("Lỗi khi xóa token:", error);
    }
};

// Hàm để xử lý phản hồi từ API đăng nhập
export const handleLoginResponse = (response) => {
    if (response.success) {
        const token = response.result.token;
        saveToken(token);
    } else {
        console.error("Đăng nhập không thành công:", response.message);
    }
};
