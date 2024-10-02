import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import logo from "../assets/img/logo.png";

const LoginPrompt = () => {
    const navigation = useNavigation();
    return (
        <View className="bg-white p-4 rounded-lg shadow-md">
            <View className="flex-row items-center">
                <Image source={logo} className="w-16 h-16 mr-4" resizeMode="contain" />

                <Text className="flex-1 text-base text-black">
                    Đăng nhập ngay để có được những trải nghiệm hấp dẫn cá nhân hóa dành cho bạn!
                </Text>
            </View>

            <TouchableOpacity
                className="flex-row items-center justify-center bg-green-600 px-4 py-3 rounded-3xl mt-4"
                onPress={() => {
                    navigation.navigate("Auth", { screen: "Login" });
                }}
            >
                <Text className="text-white text-lg mr-2">Đăng nhập</Text>
                <Ionicons name="arrow-forward-sharp" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default LoginPrompt;
