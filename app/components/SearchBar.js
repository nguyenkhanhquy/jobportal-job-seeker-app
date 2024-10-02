import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onSearchPress }) => {
    return (
        <View className="flex-row items-center bg-gray-100 rounded-lg py-3 px-4 mx-5 mt-10 mb-2 shadow-sm">
            <Ionicons name="search" size={24} color="#888" className="mr-3" />
            <TouchableOpacity className="flex-1" onPress={onSearchPress}>
                <TextInput className="text-base text-gray-700" placeholder="Tìm kiếm công việc" editable={false} />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;
