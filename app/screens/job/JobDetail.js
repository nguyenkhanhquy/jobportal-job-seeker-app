import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const JobDetail = ({ route, navigation }) => {
    const [isPressed, setIsPressed] = useState(false);

    const { job } = route.params;

    const handleBack = () => {
        if (!isPressed) {
            setIsPressed(true);
            navigation.goBack();
            setTimeout(() => setIsPressed(false), 300); // Reset trạng thái sau 300 milliseconds
        }
    };

    return (
        <View className="flex-1 bg-gray-100">
            <StatusBar style="auto" />

            {/* Back Button */}
            <TouchableOpacity className="absolute top-8 left-4 bg-green-600 p-3 rounded-full z-10" onPress={handleBack}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="p-4">
                <View
                    className="bg-white rounded-xl p-5 mt-20 mb-5 ml-0.5 mr-0.5 relative"
                    style={{
                        elevation: 1,
                    }}
                >
                    {/* Logo */}
                    <View
                        className="absolute top-[-50px] left-[41%] z-10 bg-white rounded-xl"
                        style={{
                            elevation: 1,
                        }}
                    >
                        <Image source={{ uri: job.logo }} className="w-24 h-24 rounded-xl" />
                    </View>

                    {/* Job Info */}
                    <View className="mt-12 items-center">
                        <Text className="text-xl font-bold text-gray-900 text-center">{job.title}</Text>
                        <Text className="text-lg text-gray-600 text-center mt-2">{job.company}</Text>

                        <View className="flex-row justify-around w-full mt-4">
                            <View className="items-center">
                                <Text className="text-sm font-bold text-gray-600">Mức lương</Text>
                                <Text className="text-base text-green-600 mt-1">{job.salary}</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-sm font-bold text-gray-600">Địa chỉ</Text>
                                <Text className="text-base text-green-600 mt-1">{job.address}</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-sm font-bold text-gray-600">Kinh nghiệm</Text>
                                <Text className="text-base text-green-600 mt-1">{job.experience}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Job Description */}
                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-800 mb-2">Thông tin chung</Text>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-base font-bold text-gray-700">Hình thức:</Text>
                        <Text className="text-base text-gray-600">{job.type}</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-base font-bold text-gray-700">Số lượng ứng tuyển:</Text>
                        <Text className="text-base text-gray-600">{job.applicants}</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-base font-bold text-gray-700">Giới tính:</Text>
                        <Text className="text-base text-gray-600">{job.gender}</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-base font-bold text-gray-700">Hạn nộp hồ sơ:</Text>
                        <Text className="text-base text-gray-600">{job.deadline}</Text>
                    </View>
                </View>

                {/* Job Details Sections */}
                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-800 mb-2">Mô tả công việc</Text>
                    <Text className="text-base text-gray-600 leading-6">{job.description}</Text>
                </View>

                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-800 mb-2">Yêu cầu ứng viên</Text>
                    <Text className="text-base text-gray-600 leading-6">{job.requirements}</Text>
                </View>

                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-800 mb-2">Quyền lợi</Text>
                    <Text className="text-base text-gray-600 leading-6">{job.benefits}</Text>
                </View>
            </ScrollView>

            {/* Apply Button */}
            <View className="absolute bottom-0 left-0 right-0 bg-white p-1 border-t border-gray-200">
                <TouchableOpacity className="bg-green-600 py-3 rounded-lg items-center">
                    <Text className="text-white text-lg font-bold">Ứng tuyển ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default JobDetail;
