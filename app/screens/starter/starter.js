import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Starter = ({ navigation }) => {
    return (
        <View className="flex-1 bg-gray-100 p-4 justify-between">
            {/* Buttons container */}
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

            {/* "Trải nghiệm không cần đăng nhập" */}
            <TouchableOpacity onPress={() => navigation.navigate("Home")} className="mt-4 mb-5">
                <Text className="text-sm font-bold text-green-600 text-center">Trải nghiệm không cần đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Starter;
