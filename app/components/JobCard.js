import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";

const JobCard = ({ job, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row bg-white p-4 rounded-lg mb-2 mr-4 shadow-sm border border-gray-100"
        >
            <Image source={{ uri: job.logo }} className="w-16 h-16 rounded-lg mr-4" />
            <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 mb-1">{job.title}</Text>
                <Text className="text-sm text-gray-600 mb-2">{job.company}</Text>
                <View className="flex-row space-x-2 mb-2">
                    <Text className="text-sm text-gray-700 bg-gray-100 py-1 px-2 rounded-md">{job.address}</Text>
                    <Text className="text-sm text-green-600 bg-[#e8f5e9] py-1 px-2 rounded-md">{job.salary}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default JobCard;
