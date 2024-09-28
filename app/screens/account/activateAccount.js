import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

import { sendOtp, activate } from "../../services/authAPIService";
import { getToken } from "../../utils/authStorage";

const ActivateAccount = ({ route, navigation }) => {
    const [isPressed, setIsPressed] = useState(false);

    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const { email } = route.params;

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "top",
            visibilityTime: 3000,
            text1Style: { fontSize: 16, fontWeight: "bold" },
            text2Style: { fontSize: 12 },
        });
    };

    const handleSendOTP = async () => {
        try {
            setLoading(true);
            const data = await sendOtp(email);

            if (data.success) {
                showToast("success", "Success", data.message);
                setOtpSent(true);
            } else {
                showToast("error", "Error", data.message);
                console.log(data.message);
            }
        } catch (error) {
            showToast("error", "Error", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOTP = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (token) {
                const data = await activate(token, otp);

                if (data.success) {
                    showToast("success", "Success", data.message);
                    navigation.goBack();
                } else {
                    showToast("error", "Error", data.message);
                }
            }
        } catch (error) {
            showToast("error", "Error", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (!isPressed) {
            setIsPressed(true);
            navigation.goBack();
            setTimeout(() => setIsPressed(false), 300); // Reset trạng thái sau 300 milliseconds
        }
    };

    return (
        <View className="flex-1 justify-center items-center px-6">
            <Text className="text-xl font-bold mb-4">Kích hoạt tài khoản</Text>

            <TextInput
                placeholder="Email"
                value={email}
                editable={false}
                className="bg-gray-200 p-3 rounded w-full mb-4"
            />

            {otpSent && (
                <TextInput
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    maxLength={6}
                    className="bg-white p-3 rounded w-full mb-4"
                />
            )}

            {loading ? (
                <ActivityIndicator size="large" color="#16a34a" className="mb-4" />
            ) : (
                <>
                    {otpSent ? (
                        <TouchableOpacity
                            onPress={handleConfirmOTP}
                            className="bg-green-500 py-3 px-6 rounded mb-4 w-full"
                        >
                            <Text className="text-white text-center">Xác nhận</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleSendOTP} className="bg-blue-500 py-3 px-6 rounded mb-4 w-full">
                            <Text className="text-white text-center">Gửi OTP</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}

            <TouchableOpacity onPress={handleBack} className="bg-red-500 py-3 px-6 rounded w-full">
                <Text className="text-white text-center">Hủy</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ActivateAccount;
