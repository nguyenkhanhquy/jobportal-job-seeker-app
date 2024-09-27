import React, { useState } from "react";
import { Alert, Image, Switch, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import logo from "../../assets/img/logo.png";
import InputField from "../../components/InputField";

import { register } from "../../services/authAPIService";

const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterPage = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            // Reset all states when the screen is focused
            setEmail("");
            setFullName("");
            setPassword("");
            setConfirmPassword("");
            setShowPassword(false);
            setShowConfirmPass(false);
            setIsChecked(false);
            setEmailError("");
            setFullNameError("");
            setPasswordError("");
            setConfirmPasswordError("");
        }, [])
    );

    const validateInputs = () => {
        let valid = true;

        // Validate Full Name
        if (!fullName) {
            setFullNameError("Họ và tên không được để trống");
            valid = false;
        } else {
            setFullNameError("");
        }

        // Validate Email
        if (!email) {
            setEmailError("Email không được để trống");
            valid = false;
        } else if (!emailRegex.test(email.toLowerCase())) {
            setEmailError("Email không đúng định dạng");
            valid = false;
        } else {
            setEmailError("");
        }

        // Validate Password
        if (!password) {
            setPasswordError("Mật khẩu không được để trống");
            valid = false;
        } else {
            setPasswordError("");
        }

        // Validate Confirm Password
        if (!confirmPassword) {
            setConfirmPasswordError("Vui lòng nhập lại mật khẩu");
            valid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Mật khẩu không trùng khớp");
            valid = false;
        } else {
            setConfirmPasswordError("");
        }

        return valid;
    };

    const handleRegister = async () => {
        if (!validateInputs()) {
            return;
        }

        try {
            const data = await register(email, fullName, password);
            if (data.success) {
                Alert.alert("Đăng ký thành công", data.message);
                navigation.navigate("Login");
            } else {
                Alert.alert("Đăng ký không thành công", data.message);
            }
        } catch (error) {
            Alert.alert("Đăng ký không thành công", "Đã xảy ra lỗi khi đăng ký. Hãy thử lại.");
        }
    };

    return (
        <View className="flex-1 bg-white items-center px-7 justify-between">
            <Image source={logo} className="w-40 h-40 rounded-full mt-6" />
            <Text className="text-lg text-gray-800 mb-5 text-center">Chào mừng bạn đến với JOB PORTAL</Text>
            <Text className="text-2xl text-gray-800 mb-2 text-center">Đăng ký tài khoản</Text>

            {/* Input Fields */}
            <InputField
                icon="person-outline"
                placeholder="Họ và tên"
                value={fullName}
                onChangeText={setFullName}
                error={fullNameError}
            />
            <InputField
                icon="mail-outline"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                error={emailError}
            />
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
            <InputField
                icon="lock-closed-outline"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPass}
                togglePasswordVisibility={() => setShowConfirmPass(!showConfirmPass)}
                showPassword={showConfirmPass}
                error={confirmPasswordError}
            />

            {/* Terms and Conditions */}
            <View className="flex-row items-center mb-7 px-6">
                <Switch
                    value={isChecked}
                    onValueChange={setIsChecked}
                    trackColor={{ false: "#a0a0a0", true: "#509b43" }}
                    thumbColor="#ffffff"
                />
                <Text className="text-gray-800">
                    Tôi đã đọc và đồng ý với <Text className="text-green-600">điều khoản dịch vụ</Text> và{" "}
                    <Text className="text-green-600">chính sách bảo mật</Text> của Job Portal.
                </Text>
            </View>

            {/* Register Button */}
            <TouchableOpacity
                className={`w-full rounded-full py-3 mb-7 items-center ${isChecked ? "bg-green-600" : "bg-gray-400"}`}
                onPress={handleRegister}
                disabled={!isChecked}
            >
                <Text className="text-white text-lg">Đăng ký</Text>
            </TouchableOpacity>

            {/* Navigation Links */}
            <View className="w-full">
                <View className="items-center mb-3">
                    <Text className="text-gray-800">
                        Bạn đã có tài khoản?{" "}
                        <Text className="text-green-600 font-bold" onPress={() => navigation.navigate("Login")}>
                            Đăng nhập ngay
                        </Text>
                    </Text>
                </View>

                <View className="self-center w-4/5 h-px bg-gray-300 mb-2" />

                {/* <TouchableOpacity onPress={() => navigation.navigate("Home")}> */}
                <TouchableOpacity>
                    <Text className="self-center text-sm font-bold text-green-600 mb-5">
                        Trải nghiệm không cần đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterPage;
