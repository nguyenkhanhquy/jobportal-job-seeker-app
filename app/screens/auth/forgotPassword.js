import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import { sendOtp } from "../../services/authAPIService";

const ForgotPassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [otpSent, setOtpSent] = useState(false);

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

    const handleResetPassword = async () => {
        setLoading(true);
        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.trim() === "") {
            setEmailError("Email không được để trống");
            setLoading(false);
        } else if (!emailRegex.test(email.toLowerCase())) {
            setEmailError("Email không đúng định dạng");
            setLoading(false);
        } else {
            setEmailError("");

            try {
                const data = await sendOtp(email);

                if (data.success) {
                    showToast("success", "Success", data.message);
                    navigation.navigate("ResetPassword", { email: email });
                    setOtpSent(true);
                } else {
                    if (data.statusCode === 404) {
                        setEmailError("Email này chưa được sử dụng, bạn hãy đăng ký tài khoản để tham gia");
                    } else {
                        setEmailError(data.message);
                    }
                }
            } catch (error) {
                Alert.alert("error", "Error", "An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View className="flex-1 bg-white px-5 justify-between">
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

            <View>
                <Text className="text-2xl font-bold text-gray-800 mt-10 mb-8">Quên mật khẩu</Text>
                <Text className="text-base text-gray-800 mb-5">
                    Vui lòng nhập email đăng ký của bạn. Chúng tôi sẽ gửi hướng dẫn đổi mật khẩu tới email này.
                </Text>
                <View
                    className={`flex-row items-center w-full h-12 rounded-lg mb-2 px-4 ${
                        emailError ? "border border-red-500" : "bg-gray-100"
                    }`}
                >
                    <TextInput
                        className="flex-1 h-full text-base text-gray-700"
                        placeholder="Nhập email"
                        placeholderTextColor="#a0a0a0"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError("");
                        }}
                        editable={!otpSent}
                    />
                </View>
                {emailError ? <Text className="text-red-500 text-sm mb-4">{emailError}</Text> : null}
            </View>

            <View>
                <TouchableOpacity
                    className="bg-green-600 w-full rounded-lg py-3 px-5 mb-4"
                    onPress={handleResetPassword}
                >
                    <Text className="text-white text-center text-lg">Tạo lại mật khẩu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ForgotPassword;
