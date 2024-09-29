import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cv from "../../assets/img/cv.png";
import uploadFile from "../../assets/img/uploadFile.jpg";

const UploadCV = ({ route, navigation }) => {
    return (
        <View className="flex-1 bg-white">
            <View className="bg-white mt-2" />
            {/* Introduction Section */}
            <View className="bg-green-50 p-4 flex-row items-center">
                <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-800">
                        Upload CV để các cơ hội việc làm tự tìm đến bạn
                    </Text>
                    <Text className="text-gray-500 mt-2">
                        Giảm đến 50% thời gian cần thiết để tìm được một công việc phù hợp
                    </Text>
                </View>
                <Image source={cv} className="w-24 h-24 ml-4" />
            </View>

            {/* Upload Section */}
            <View className="justify-center items-center mt-8">
                <View className="bg-white rounded-xl p-4 items-center w-11/12" style={styles.dashStyle}>
                    <Image source={uploadFile} className="w-24 h-24 mb-4" />
                    <TouchableOpacity
                        className="flex-row items-center mb-2"
                        onPress={() => {
                            /* Thêm logic tải CV tại đây */
                        }}
                    >
                        <Text className="text-base font-bold text-gray-800 ml-2">Nhấn để tải lên</Text>
                    </TouchableOpacity>
                    <Text className="text-sm text-gray-500 text-center">
                        Hỗ trợ định dạng .doc, .docx, .pdf, có kích thước dưới <Text className="font-bold">5MB</Text>
                    </Text>
                </View>
            </View>

            {/* Upload Button */}
            <View className="p-5 mt-auto">
                <TouchableOpacity
                    className="bg-green-600 rounded-lg py-3 px-5 items-center"
                    onPress={() => {
                        /* Thêm logic xử lý việc tải CV tại đây */
                    }}
                >
                    <Text className="text-white font-bold text-base">Tải CV lên</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dashStyle: {
        borderWidth: 2,
        borderColor: "#22c55e", // green-500
        borderStyle: "dashed",
    },
});

export default UploadCV;
