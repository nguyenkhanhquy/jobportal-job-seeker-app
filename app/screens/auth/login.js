import React, { useState } from "react";
import { Alert, Image, Switch, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import logo from "../../assets/img/logo.png";
import InputField from "../../components/InputField";

import { login } from "../../services/authAPIService";

import { handleLoginResponse } from "../../utils/authStorage";

const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            // Reset all states when the screen is focused
            setEmail("");
            setPassword("");
            setShowPassword(false);
            setIsChecked(false);
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
        }
    };

    return (
        <View className="flex-1 bg-white items-center px-7 justify-between">
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

            {/* <TouchableOpacity onPress={() => navigation.navigate("ForgotPassWord")} className="self-end mb-8"> */}
            <TouchableOpacity className="self-end mb-8">
                <Text className="text-green-600 font-bold">Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
                className={`w-full rounded-full py-3 mb-10 items-center ${isChecked ? "bg-green-600" : "bg-gray-400"}`}
                onPress={handleLogin}
                disabled={!isChecked}
            >
                <Text className="text-white text-lg">Đăng nhập</Text>
            </TouchableOpacity>

            {/* Terms and Conditions */}
            <View className="flex-row items-center mb-10 px-6">
                <Switch
                    value={isChecked}
                    onValueChange={setIsChecked}
                    trackColor={{ false: "#a0a0a0", true: "#16a34a" }}
                    thumbColor="#ffffff"
                />
                <Text className="text-gray-800">
                    Bằng việc đăng nhập, tôi đã đọc và đồng ý với{" "}
                    <Text className="text-green-600">điều khoản dịch vụ</Text> và{" "}
                    <Text className="text-green-600">chính sách bảo mật</Text> của Job Portal.
                </Text>
            </View>

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

                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Text className="self-center text-sm font-bold text-green-600 mb-5">
                        Trải nghiệm không cần đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
