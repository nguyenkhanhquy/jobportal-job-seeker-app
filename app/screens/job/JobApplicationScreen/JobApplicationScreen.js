import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import uploadFile from "../../../assets/img/uploadFile.jpg";

import { applyJob, uploadCV } from "../../../services/jobApplyService";

const JobApplicationScreen = ({ route, navigation }) => {
    const { jobPostId } = route.params;

    const [loading, setLoading] = useState(false);
    const [coverLetter, setCoverLetter] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "bottom",
            bottomOffset: 80,
            visibilityTime: 3000,
            text1Style: { fontSize: 16, fontWeight: "bold" },
            text2Style: { fontSize: 12 },
        });
    };

    // Xử lý chọn tệp
    const handleFilePick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ],
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                showToast("info", "Bạn đã hủy chọn tệp");
                return;
            }

            const file = result.assets[0];

            // Kiểm tra kích thước file (ví dụ: giới hạn 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showToast("error", "File không được vượt quá 5MB");
                return;
            }

            setSelectedFile(file);
        } catch (error) {
            showToast("error", "Đã xảy ra lỗi khi chọn tệp");
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    const handleApply = async () => {
        setLoading(true);
        try {
            if (selectedFile && coverLetter !== "") {
                const cv = {
                    uri: selectedFile.uri,
                    type: selectedFile.mimeType,
                    name: selectedFile.name,
                };

                const dataUpload = await uploadCV(cv);
                const data = await applyJob(jobPostId, coverLetter, dataUpload.result);
                if (!data.success) {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
                showToast("success", data.message);
                navigation.goBack();
            } else {
                showToast("info", "Vui lòng cung cấp đầy đủ thông tin");
            }
        } catch (error) {
            showToast("error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Upload Section */}
            <View className="p-4">
                <Text className="text-lg font-bold text-gray-800 mb-2">CV ứng tuyển</Text>
                <View className="justify-center p-4 border border-green-500 rounded-lg">
                    <Text className="text-base font-bold text-gray-800 mb-4">Tải CV lên từ điện thoại</Text>

                    {selectedFile ? (
                        <View className="flex-row items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <View className="flex-row items-center">
                                <Ionicons name="document-text-outline" size={24} color="#22c55e" />
                                <Text className="text-base font-bold text-gray-800 ml-2">{selectedFile.name}</Text>
                            </View>
                            <TouchableOpacity onPress={handleRemoveFile}>
                                <Ionicons name="close-circle" size={24} color="#ef4444" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="bg-white rounded-xl p-2 items-center w-full" style={styles.dashStyle}>
                            <Image source={uploadFile} className="w-24 h-24 mb-2" />
                            <TouchableOpacity className="flex-row items-center mb-2" onPress={handleFilePick}>
                                <Text className="text-base font-bold text-gray-800 ml-2">Nhấn để tải lên</Text>
                            </TouchableOpacity>
                            <Text className="text-sm text-gray-500 text-center">
                                Hỗ trợ định dạng .doc, .docx, .pdf
                            </Text>
                        </View>
                    )}
                </View>

                {/* Cover Letter Section */}
                <Text className="text-lg font-bold text-gray-800 mt-6">Thư giới thiệu</Text>
                <TextInput
                    className="bg-gray-50 rounded-lg border border-gray-200 p-4 mt-2 text-gray-800"
                    style={{ height: 120, textAlignVertical: "top" }}
                    placeholder="Viết giới thiệu ngắn ngọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn được làm việc tại công ty."
                    multiline={true}
                    value={coverLetter}
                    onChangeText={setCoverLetter}
                />
            </View>

            {/* Apply Button */}
            <View className="px-4 pb-2 mt-auto">
                <TouchableOpacity className="bg-green-600 rounded-lg py-3 px-5 items-center" onPress={handleApply}>
                    <Text className="text-white font-bold text-base">Ứng tuyển</Text>
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

export default JobApplicationScreen;
