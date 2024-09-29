import React from "react";
import { Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

const Starter = ({ navigation }) => {
    return (
        <ImageBackground source={require("../../assets/img/starter.png")} className="flex-1 justify-between p-4">
            <StatusBar style="auto" />

            <View className="flex-row justify-between w-full mt-auto">
                <TouchableOpacity
                    className="bg-green-600 rounded-full py-3 px-6 mx-2 flex-1"
                    onPress={() => navigation.navigate("Auth", { screen: "Login" })}
                >
                    <Text className="text-white text-lg font-bold text-center">Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-gray-100 border border-green-600 rounded-full py-3 px-6 mx-2 flex-1"
                    onPress={() => navigation.navigate("Auth", { screen: "Register" })}
                >
                    <Text className="text-green-600 text-lg font-bold text-center">Đăng ký</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Home")} className="mt-4 mb-5">
                <Text className="text-sm font-bold text-green-600 text-center">Trải nghiệm không cần đăng nhập</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default Starter;
