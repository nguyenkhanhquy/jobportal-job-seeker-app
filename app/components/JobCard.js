import { useState, useEffect } from "react";
import { TouchableOpacity, View, Image, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { saveJobPost } from "../services/jobPostService";
import Toast from "react-native-toast-message";

const screenWidth = Dimensions.get("window").width;

const JobCard = ({ job, onPress }) => {
    const [isSaved, setIsSaved] = useState(false);

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

    const handleSaveJob = async () => {
        try {
            const data = await saveJobPost(job.id);
            if (!data.success) {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
            setIsSaved((prev) => !prev);
            showToast("success", data.message);
        } catch (error) {
            if (error.statusCode === 401) {
                showToast("info", "Vui lòng đăng nhập để lưu");
            } else {
                showToast("error", error.message);
            }
        }
    };

    useEffect(() => {
        setIsSaved(job.saved);
    }, [job.id, job.saved]);

    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white p-4 rounded-lg mb-2 shadow-sm border border-green-500 flex-row"
            style={{ width: screenWidth - 40, marginEnd: 20 }}
        >
            <Image source={{ uri: job.company.logo }} className="w-16 h-16 rounded-lg mr-4" />
            <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 mb-1" numberOfLines={1} ellipsizeMode="tail">
                    {job.title}
                </Text>

                <Text className="text-sm text-gray-600 mb-2" numberOfLines={1} ellipsizeMode="tail">
                    {job.company.name}
                </Text>

                <View className="flex-row space-x-2 mb-2">
                    <Text className="text-xs text-gray-700 bg-gray-100 py-1 px-2 rounded-md">{job.type}</Text>
                    <Text className="text-xs text-green-600 bg-[#e8f5e9] py-1 px-2 rounded-md">{job.salary}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={handleSaveJob}>
                <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={isSaved ? "#10b981" : "gray"}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default JobCard;
