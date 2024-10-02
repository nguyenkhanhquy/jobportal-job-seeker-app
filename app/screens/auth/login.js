import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import logo from "../../assets/img/logo.png";
import InputField from "../../components/InputField";

import { login } from "../../services/authAPIService";

import { handleLoginResponse } from "../../utils/authStorage";

const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            // Reset all states when the screen is focused
            setEmail("");
            setPassword("");
            setShowPassword(false);
            setEmailError("");
            setPasswordError("");
        }, [])
    );

    const validateInputs = () => {
        let valid = true;
        setEmailError("");
        setPasswordError("");

        if (!email) {
            setEmailError("Email không được để trống");
            valid = false;
        } else if (!emailRegex.test(email.toLowerCase())) {
            setEmailError("Email không đúng định dạng");
            valid = false;
        }

        if (!password) {
            setPasswordError("Mật khẩu không được để trống");
            valid = false;
        }

        return valid;
    };

    const handleLogin = async () => {
        if (!validateInputs()) {
            return;
        }

        try {
            setLoading(true);
            const data = await login(email, password);
            if (data.success) {
                setEmail("");
                setPassword("");
                handleLoginResponse(data);
                navigation.navigate("Home", {
                    screen: "HomeTab",
                });
            } else {
                Alert.alert("Đăng nhập không thành công", data.message);
            }
        } catch (error) {
            Alert.alert("Đăng nhập không thành công", "Đã xảy ra lỗi khi đăng nhập. Hãy thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/img/background.png")}
            className="flex-1 bg-white items-center px-7 justify-between"
        >
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

            <Image source={logo} className="w-40 h-40 mt-6" />
            <Text className="text-lg text-gray-800 mb-10 text-center">Chào mừng bạn đến với JOB PORTAL</Text>
            <Text className="text-2xl text-gray-800 mb-2 text-center">Đăng nhập</Text>

            {/* Email Input */}
            <InputField
                icon="mail-outline"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                error={emailError}
            />

            {/* Password Input */}
            <InputField
                icon="lock-closed-outline"
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                togglePasswordVisibility={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
                error={passwordError}
            />

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassWord")} className="self-end mb-8">
                <Text className="text-green-600 font-bold">Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
                className={"w-full rounded-full py-3 mb-32 items-center bg-green-600"}
                onPress={handleLogin}
            >
                <Text className="text-white text-lg">Đăng nhập</Text>
            </TouchableOpacity>

            {/* Navigation */}
            <View className="w-full">
                <View className="items-center mb-3">
                    <Text className="text-gray-800">
                        Bạn chưa có tài khoản?{" "}
                        <Text className="text-green-600 font-bold" onPress={() => navigation.navigate("Register")}>
                            Đăng ký ngay
                        </Text>
                    </Text>
                </View>

                <View className="self-center w-4/5 h-px bg-gray-300 mb-2" />

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Home", {
                            screen: "HomeTab",
                        })
                    }
                >
                    <Text className="self-center text-sm font-bold text-green-600 mb-5">
                        Trải nghiệm không cần đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default Login;
