import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import { updateProfile } from "../../services/jobSeekerService";

const Profile = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const email = route.params.user.user.email;
    const dob = route.params.user.dob;

    const [fullName, setFullName] = useState(route.params.user.fullName);
    const [fullNameError, setFullNameError] = useState("");

    const [address, setAddress] = useState(route.params.user.address);

    const [phone, setPhone] = useState(route.params.user.phone);

    const [workExperience, setWorkExperience] = useState(route.params.user.workExperience);

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

            const body = { fullName, address, workExperience, phone, dob: dob };

            const data = await updateProfile(body);

            if (data.success) {
                showToast("success", data.message);
                navigation.goBack();
            } else {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
        } catch (error) {
            showToast("error", error.message);
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

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "bottom",
            bottomOffset: 80,
            visibilityTime: 3000,
            text1Style: { fontSize: 16, fontWeight: "bold" },
            text2Style: { fontSize: 12 },
        });
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
                {fullNameError ? <Text className="text-red-500 text-sm mb-4">{fullNameError}</Text> : null}

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

                <Text className="text-base font-bold mb-2">Số điện thoại</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-4">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập địa chỉ"
                        placeholderTextColor="#a0a0a0"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>

                <Text className="text-base font-bold mb-2">Kinh nghiệm làm việc</Text>
                <View className="bg-white rounded-lg   mb-2">
                    <Picker selectedValue={workExperience} onValueChange={(itemValue) => setWorkExperience(itemValue)}>
                        <Picker.Item label="Chọn kinh nghiệm làm việc" value="" />
                        <Picker.Item label="Dưới 1 năm" value="Dưới 1 năm" />
                        <Picker.Item label="1 năm" value="1 năm" />
                        <Picker.Item label="2 năm" value="2 năm" />
                        <Picker.Item label="3 năm" value="3 năm" />
                        <Picker.Item label="4 năm" value="4 năm" />
                        <Picker.Item label="5 năm" value="5 năm" />
                        <Picker.Item label="Trên 5 năm" value="Trên 5 năm" />
                    </Picker>
                </View>
            </View>

            {/* Button Section */}
            <View className="flex-row justify-between bg-white py-3 px-2">
                <TouchableOpacity
                    className="border border-[#16a34a] rounded-full py-3 px-4 w-[49%]"
                    onPress={handleCancel}
                >
                    <Text className="text-[#16a34a] text-center font-bold text-base">Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#16a34a] rounded-full py-3 px-4 w-[49%]" onPress={handleSave}>
                    <Text className="text-white text-center font-bold text-base">Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Profile;
