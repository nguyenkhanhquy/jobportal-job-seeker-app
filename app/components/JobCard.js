import React from "react";
import { TouchableOpacity, View, Image, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Get screen width for responsive design
const screenWidth = Dimensions.get("window").width;

const JobCard = ({ job, onPress, onSave }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white p-4 rounded-lg mb-2 mr-4 shadow-sm border border-green-500 flex-row"
            style={{
                width: screenWidth * 0.89,
            }}
        >
            <Image source={{ uri: job.logo }} className="w-16 h-16 rounded-lg mr-4" />
            <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 mb-1" numberOfLines={1} ellipsizeMode="tail">
                    {job.title}
                </Text>

                <Text className="text-sm text-gray-600 mb-2" numberOfLines={1} ellipsizeMode="tail">
                    {job.company}
                </Text>

                <View className="flex-row space-x-2 mb-2">
                    <Text className="text-xs text-gray-700 bg-gray-100 py-1 px-2 rounded-md">{job.address}</Text>
                    <Text className="text-xs text-green-600 bg-[#e8f5e9] py-1 px-2 rounded-md">{job.salary}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={onSave}>
                <Ionicons name="bookmark-outline" size={24} color="gray" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default JobCard;
