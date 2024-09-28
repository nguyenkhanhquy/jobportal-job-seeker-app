import React, { useState } from "react";
import {
    ActivityIndicator,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import { getToken } from "../../utils/authStorage";
import { updateProfile } from "../../services/jobSeekerAPIService";

const Profile = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const email = route.params.user.email;

    const [fullName, setFullName] = useState(route.params.user.fullName);
    const [fullNameError, setFullNameError] = useState("");

    const [address, setAddress] = useState(route.params.user.address);

    const [workExperience, setWorkExperience] = useState(
        route.params.user.workExperience
    );

    const validateFullName = (value) => {
        if (value.trim() === "") {
            setFullNameError("Họ và tên không được để trống");
        } else {
            setFullNameError("");
        }
        setFullName(value);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (token) {
                const body = { fullName, address, workExperience };

                const data = await updateProfile(token, body);

                if (data.success) {
                    Alert.alert(
                        "Thành công",
                        "Cập nhật thông tin tài khoản thành công."
                    );
                    navigation.goBack();
                } else {
                    Alert.alert("Lỗi", "Đã xảy ra lỗi. Hãy thử lại.");
                }
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (!isPressed) {
            setIsPressed(true);
            navigation.goBack();
            setTimeout(() => setIsPressed(false), 300); // Reset trạng thái sau 300 milliseconds
        }
    };

    return (
        <View className="flex-1 bg-gray-100">
            <StatusBar style="auto" />

            {loading && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.1)", // Làm mờ phần nền xung quanh một chút
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                    }}
                >
                    {/* Hình vuông chứa ActivityIndicator */}
                    <View
                        style={{
                            width: 68, // Kích thước của hình vuông
                            height: 68,
                            backgroundColor: "#fff", // Màu nền trắng cho hình vuông
                            borderRadius: 10, // Bo góc cho hình vuông
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5, // Hiệu ứng đổ bóng cho Android
                        }}
                    >
                        <ActivityIndicator size="large" color="#6dcf5b" />
                    </View>
                </View>
            )}

            {/* Form Section */}
            <View className="flex-1 mt-6 px-6">
                <Text className="text-base font-bold mb-2">Email</Text>
                <View className="bg-gray-200 rounded-lg px-4 py-3 mb-4">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Email"
                        placeholderTextColor="#a0a0a0"
                        value={email}
                        editable={false}
                    />
                </View>

                <Text className="text-base font-bold mb-2">Họ và tên</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-4">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập họ và tên"
                        placeholderTextColor="#a0a0a0"
                        value={fullName}
                        onChangeText={validateFullName}
                    />
                </View>
                {fullNameError ? (
                    <Text className="text-red-500 text-sm mb-4">
                        {fullNameError}
                    </Text>
                ) : null}

                <Text className="text-base font-bold mb-2">Địa chỉ</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-4">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập địa chỉ"
                        placeholderTextColor="#a0a0a0"
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>

                <Text className="text-base font-bold mb-2">
                    Kinh nghiệm làm việc
                </Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-4">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập kinh nghiệm làm việc"
                        placeholderTextColor="#a0a0a0"
                        value={workExperience}
                        onChangeText={setWorkExperience}
                    />
                </View>
            </View>

            {/* Button Section */}
            <View className="flex-row justify-between bg-white py-3 px-2">
                <TouchableOpacity
                    className="border border-[#509b43] rounded-full py-3 px-4 w-[49%]"
                    onPress={handleCancel}
                >
                    <Text className="text-[#509b43] text-center font-bold text-base">
                        Hủy
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-[#509b43] rounded-full py-3 px-4 w-[49%]"
                    onPress={handleSave}
                >
                    <Text className="text-white text-center font-bold text-base">
                        Lưu
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Profile;
