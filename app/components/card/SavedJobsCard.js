import { useState, useEffect } from "react";
import { TouchableOpacity, View, Image, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { saveJobPost } from "../../services/jobPostService";
import Toast from "react-native-toast-message";
import { formatDate } from "../../utils/dateUtil";

const screenWidth = Dimensions.get("window").width;

const SavedJobCard = ({ job, onPress }) => {
    const [isSaved, setIsSaved] = useState(true);

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "top",
            topOffset: 40,
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
        setIsSaved(true);
    }, [job.id]);

    const getExpiryStatus = (expiryDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        today.setDate(today.getDate() + 1);
        const expiry = new Date(expiryDate);

        // Tính số ngày còn lại
        const daysRemaining = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        if (daysRemaining < 0) return "expired";
        if (daysRemaining <= 3) return "warning";
        return "active";
    };

    const getExpiryDateStyle = (expiryDate) => {
        const status = getExpiryStatus(expiryDate);
        switch (status) {
            case "expired":
                return "text-xs text-red-600 bg-red-50 py-1 px-2 rounded-md";
            case "warning":
                return "text-xs text-orange-600 bg-orange-50 py-1 px-2 rounded-md";
            default:
                return "text-xs text-green-600 bg-[#e8f5e9] py-1 px-2 rounded-md";
        }
    };

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
                    <Text className={getExpiryDateStyle(job.expiryDate)}>
                        Ngày hết hạn: {formatDate(job.expiryDate)}
                        {" - "}
                        {(() => {
                            switch (getExpiryStatus(job.expiryDate)) {
                                case "expired":
                                    return "Hết hạn";
                                case "warning":
                                    return "Sắp hết hạn";
                                default:
                                    return "Còn hạn";
                            }
                        })()}
                    </Text>
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

export default SavedJobCard;
