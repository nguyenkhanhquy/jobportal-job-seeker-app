import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (text) => {
        setQuery(text);
        onSearch(text);
    };

    return (
        <View className="flex-row items-center bg-gray-100 rounded-lg py-3 px-4 mx-5 shadow-sm">
            <Ionicons name="search" size={24} color="#888" className="mr-3" />
            <TextInput
                className="flex-1 text-base text-gray-700"
                placeholder="Tìm kiếm công việc"
                value={query}
                onChangeText={handleChange}
            />
        </View>
    );
};

export default SearchBar;
