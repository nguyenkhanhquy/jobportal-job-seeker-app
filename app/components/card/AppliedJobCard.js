import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AppliedJobCard = ({ job, onViewDetail, onViewCV }) => {
    return (
        <View className="bg-white rounded-lg p-4 shadow mb-4">
            {/* Job Info */}
            <Text className="text-lg font-bold text-green-600">{job.title}</Text>
            <Text className="text-base text-gray-800 mt-1">
                <Text className="font-semibold">Vị trí: </Text>
                {job.jobPosition}
            </Text>
            <Text className="text-base text-gray-800">
                <Text className="font-semibold">Công ty: </Text>
                {job.companyName}
            </Text>
            <Text className="text-base text-gray-800 mt-1">
                <Text className="font-semibold">Ngày ứng tuyển: </Text>
                {job.applyDate}
            </Text>
            {/* Cover Letter */}
            <Text className="text-base text-gray-800 mt-2 font-semibold">Thư giới thiệu:</Text>
            <Text className="text-sm text-gray-600 leading-5">{job.coverLetter}</Text>

            {/* Buttons */}
            <View className="flex-row justify-between items-center mt-4">
                <TouchableOpacity
                    className="flex-row items-center space-x-2 border border-green-600 px-3 py-2 rounded-lg"
                    onPress={onViewCV}
                >
                    <Ionicons name="document-text-outline" size={24} color="#22c55e" />
                    <Text className="text-green-600 font-semibold">Xem CV</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row items-center space-x-2 px-3 py-2 rounded-lg border border-green-600"
                    onPress={onViewDetail}
                >
                    <Text className="text-green-600 text-base font-semibold">Chi tiết công việc</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppliedJobCard;
