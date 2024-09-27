import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const InputField = ({
    icon,
    placeholder,
    value,
    onChangeText,
    error,
    secureTextEntry,
    togglePasswordVisibility,
    showPassword,
}) => {
    return (
        <View className="w-full mb-2">
            <View
                className={`flex-row items-center w-full h-12 rounded-full px-4 bg-gray-100 ${
                    error ? "border border-red-500" : ""
                }`}
            >
                <Ionicons name={icon} size={24} color="#a0a0a0" />
                <TextInput
                    className="flex-1 h-full text-base text-gray-700 ml-2"
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor="#a0a0a0"
                    value={value}
                    onChangeText={onChangeText}
                />
                {togglePasswordVisibility && (
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#a0a0a0" />
                    </TouchableOpacity>
                )}
            </View>
            {error ? <Text className="text-red-500 text-sm px-5">{error}</Text> : null}
        </View>
    );
};

export default InputField;
