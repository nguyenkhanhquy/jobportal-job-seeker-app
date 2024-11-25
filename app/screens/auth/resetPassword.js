import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import { resetPassword, sendOTP } from "../../services/authService";

const ResetPassword = ({ navigation, route }) => {
    const { email } = route.params;

    const [loading, setLoading] = useState(false);

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [countdown, setCountdown] = useState(300);

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

    const handleSendOtp = async () => {
        try {
            setOtp("");
            setLoading(true);
            const data = await sendOTP(email);

            if (data.success) {
                setCountdown(300);
                showToast("success", data.message);
            } else {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
        } catch (error) {
            showToast("error", data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            showToast("info", "Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (newPassword.length < 8) {
            showToast("info", "Mật khẩu mới phải chứa ít nhất 8 ký tự");
            return;
        }

        if (newPassword !== confirmPassword) {
            showToast("info", "Mật khẩu không trùng khớp");
            return;
        }

        try {
            setLoading(true);
            const data = await resetPassword(email, otp, newPassword);

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
                <Text style={styles.title}>Đặt lại mật khẩu</Text>
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
                    <TouchableOpacity style={styles.resendButton} onPress={handleSendOtp}>
                        <Text style={styles.resendButtonText}>Gửi lại mã</Text>
                    </TouchableOpacity>
                </View>

                <Text>
                    Mật khẩu mới <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={24} color="#a0a0a0" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu mới"
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#a0a0a0"
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#a0a0a0" />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={24} color="#a0a0a0" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={!showConfirmPass}
                        placeholderTextColor="#a0a0a0"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                        <Ionicons
                            name={showConfirmPass ? "eye-off-outline" : "eye-outline"}
                            size={24}
                            color="#a0a0a0"
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.noteText}>
                        Mã xác nhận hiện tại sẽ hết hạn sau{" "}
                        <Text className="text-green-600 font-semibold">{formatTime(countdown)}</Text>.
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Cập nhật mật khẩu</Text>
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
    icon: {
        marginRight: 10,
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

export default ResetPassword;
