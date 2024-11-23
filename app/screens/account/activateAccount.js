import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

import { sendOTP, activeAccount } from "../../services/authService";

const ActivateAccount = ({ route, navigation }) => {
    const [isPressed, setIsPressed] = useState(false);

    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const [countdown, setCountdown] = useState(300);

    const { email } = route.params;

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

    // Countdown logic
    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const handleSendOTP = async () => {
        setLoading(true);
        try {
            setLoading(true);
            const data = await sendOTP(email);
            setCountdown(300);
            if (data.success) {
                showToast("success", data.message);
                setOtpSent(true);
            } else {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
        } catch (error) {
            showToast("error", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOTP = async () => {
        setLoading(true);
        try {
            const data = await activeAccount(email, otp);

            if (data.success) {
                showToast("success", data.message);
                navigation.navigate("Login");
            } else {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
        } catch (error) {
            showToast("error", error.message);
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

    //     return (
    //         <View className="flex-1 justify-center items-center px-6">
    //             <Text className="text-xl font-bold mb-4">Kích hoạt tài khoản</Text>

    //             <TextInput
    //                 placeholder="Email"
    //                 value={email}
    //                 editable={false}
    //                 className="bg-gray-200 p-3 rounded w-full mb-4"
    //             />

    //             {otpSent && (
    //                 <TextInput
    //                     placeholder="Enter OTP"
    //                     value={otp}
    //                     onChangeText={setOtp}
    //                     keyboardType="numeric"
    //                     maxLength={6}
    //                     className="bg-white p-3 rounded w-full mb-4"
    //                 />
    //             )}

    //             {loading ? (
    //                 <ActivityIndicator size="large" color="#16a34a" className="mb-4" />
    //             ) : (
    //                 <>
    //                     {otpSent ? (
    //                         <TouchableOpacity
    //                             onPress={handleConfirmOTP}
    //                             className="bg-green-500 py-3 px-6 rounded mb-4 w-full"
    //                         >
    //                             <Text className="text-white text-center">Xác nhận</Text>
    //                         </TouchableOpacity>
    //                     ) : (
    //                         <TouchableOpacity onPress={handleSendOTP} className="bg-blue-500 py-3 px-6 rounded mb-4 w-full">
    //                             <Text className="text-white text-center">Gửi OTP</Text>
    //                         </TouchableOpacity>
    //                     )}
    //                 </>
    //             )}

    //             <TouchableOpacity onPress={handleBack} className="bg-red-500 py-3 px-6 rounded w-full">
    //                 <Text className="text-white text-center">Hủy</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // };

    return (
        <View style={styles.container}>
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
                        <ActivityIndicator size="large" color="#16a34a" />
                    </View>
                </View>
            )}

            <View>
                <Text style={styles.title}>Kích hoạt tài khoản</Text>
                <Text style={styles.description}>
                    Chúng tôi đã gửi mã xác nhận tới địa chỉ email <Text style={styles.bold}>{email}</Text>. Vui lòng
                    kiểm tra hòm thư hoặc hòm thư spam để lấy mã.
                </Text>

                <Text>
                    Mã xác nhận <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mã xác nhận"
                        value={otp}
                        onChangeText={setOtp}
                        keyboardType="numeric"
                        maxLength={6}
                    />
                    <TouchableOpacity style={styles.resendButton} onPress={handleSendOTP}>
                        <Text style={styles.resendButtonText}>Gửi lại mã</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.noteText}>
                        Mã xác nhận hiện tại sẽ hết hạn sau{" "}
                        <Text className="text-green-600 font-semibold">{formatTime(countdown)}</Text>.
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleConfirmOTP}>
                <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#ffffff",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        color: "#333",
        marginTop: 40,
        marginBottom: 30,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderRadius: 5,
        marginBottom: 8,
        paddingHorizontal: 15,
        backgroundColor: "#f9f9f9",
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: 16,
    },
    resendButton: {
        backgroundColor: "#16a34a",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginLeft: 10,
    },
    resendButtonText: {
        color: "#ffffff",
        fontSize: 14,
    },
    errorText: {
        color: "red",
        marginBottom: 16,
        fontSize: 14,
    },
    button: {
        backgroundColor: "#16a34a",
        width: "100%",
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
    },
    bold: {
        fontWeight: "bold",
        color: "#16a34a",
    },
    noteText: {
        color: "#a0a0a0",
        textAlign: "center",
    },
});

export default ActivateAccount;
