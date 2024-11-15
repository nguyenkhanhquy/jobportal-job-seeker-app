import React, { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Alert, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";

import { logout } from "../../services/authAPIService";
import { getCurrentProfile } from "../../services/authAPIService";
import { updateAvatar } from "../../services/jobSeekerAPIService";

import { getToken, deleteToken } from "../../utils/authStorage";

const AccountTab = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    const fetchUserInfo = useCallback(async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (token) {
                const data = await getCurrentProfile(token);
                if (data.success) {
                    setUserInfo(data.result);
                } else {
                    Alert.alert("Error", data.message);
                }
            }
        } catch (error) {
            Alert.alert("Error", "Failed to fetch user information.");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchUserInfo();
        }, [])
    );

    const selectImage = async () => {
        // Yêu cầu quyền truy cập thư viện ảnh
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Quyền truy cập bị từ chối!", "Bạn cần cấp quyền để chọn ảnh.");
            return;
        }

        // Mở thư viện ảnh
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // Cho phép chỉnh sửa hình ảnh
            aspect: [1, 1], // Cắt ảnh theo tỷ lệ 1:1 (hình vuông)
            quality: 1, // Chất lượng hình ảnh (từ 0 đến 1)
        });

        // Nếu người dùng không hủy chọn ảnh
        if (!result.canceled) {
            const selectedImage = result.assets[0];
            const { uri } = selectedImage;
            const fileName = uri.split("/").pop(); // Lấy tên tệp từ đường dẫn uri

            const fileExtension = uri.split(".").pop().toLowerCase();
            const type = `image/${fileExtension}`;

            // Tạo đối tượng file
            const avatar = {
                uri,
                type: type || "image/jpeg",
                name: fileName,
            };

            try {
                setLoading(true);
                const token = await getToken();
                if (token) {
                    const data = await updateAvatar(token, avatar);
                    if (data.success) {
                        fetchUserInfo();
                        Alert.alert("Success", data.message);
                    } else {
                        Alert.alert("Error", data.message);
                    }
                }
            } catch (error) {
                Alert.alert("Logout failed", "An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert("Đã hủy", "Bạn đã hủy chọn ảnh.");
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            "Xác nhận đăng xuất",
            "Bạn có chắc chắn muốn đăng xuất?",
            [
                {
                    text: "Hủy",
                },
                {
                    text: "Đăng xuất",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            const token = await getToken();
                            if (token) {
                                const data = await logout(token);

                                if (data.success) {
                                    deleteToken();
                                    setUserInfo(null);
                                    navigation.navigate("Auth", { screen: "Login" });
                                }
                            }
                        } catch (error) {
                            Alert.alert("Logout failed", "An error occurred. Please try again.");
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <StatusBar style="auto" />
                <ActivityIndicator size="large" color="#16a34a" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100">
            <StatusBar style="auto" />
            {/* Background Section */}
            <View className="bg-green-600 h-36 w-full absolute top-0 left-0 right-0 z-[-1]" />

            {/* Profile Section */}
            {userInfo ? (
                <>
                    <View className="flex-row bg-white rounded-lg p-5 mx-5 mt-20" style={styles.shadowStyle}>
                        <View className="relative">
                            {userInfo.avatar ? (
                                <Image
                                    source={{
                                        uri: userInfo.avatar,
                                    }}
                                    className="w-24 h-24 rounded-full border-2 border-green-600"
                                />
                            ) : (
                                <View className="w-24 h-24 rounded-full border-2 border-green-600 justify-center items-center">
                                    <Ionicons name="person-outline" size={48} color="#509b43" />
                                </View>
                            )}
                            <TouchableOpacity
                                className="absolute right-0 bottom-0 bg-gray-600 rounded-full p-1 border-2 border-white"
                                onPress={selectImage}
                            >
                                <Ionicons name="camera-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1 ml-4">
                            <Text className="text-lg font-bold text-gray-800 mb-1">{userInfo.fullName}</Text>
                            <Text className="text-sm text-gray-600" numberOfLines={1} ellipsizeMode="tail">
                                {userInfo.email}
                            </Text>
                            {userInfo.active ? (
                                <View className="flex-row items-center mt-2">
                                    <Octicons
                                        name="shield-check"
                                        size={20}
                                        color="#6dcf5b"
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text className="text-sm font-bold text-gray-600">Tài khoản đã xác thực</Text>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("ActivateAccount", { email: userInfo.email });
                                    }}
                                >
                                    <View className="flex-row items-center mt-2">
                                        <Octicons name="shield-x" size={20} color="red" style={{ marginRight: 4 }} />
                                        <Text className="text-sm font-bold text-gray-600">Tài khoản chưa xác thực</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Options Section */}
                    <View className="px-5 mt-10">
                        <TouchableOpacity
                            className="bg-white p-3 rounded-lg mb-4"
                            style={styles.shadowStyle}
                            onPress={() => navigation.navigate("Profile", { user: userInfo })}
                        >
                            <Text className="text-lg font-medium text-gray-800">Thông tin cá nhân</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-white p-3 rounded-lg mb-4"
                            style={styles.shadowStyle}
                            onPress={() => navigation.navigate("ChangePassword", { user: userInfo })}
                        >
                            <Text className="text-lg font-medium text-gray-800">Đổi mật khẩu</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-white p-3 rounded-lg"
                            style={styles.shadowStyle}
                            onPress={handleLogout}
                        >
                            <Text className="text-lg font-medium text-red-600">Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <View className="flex-row bg-white rounded-lg p-5 mx-5 mt-20" style={styles.shadowStyle}>
                        <View className="relative mr-5">
                            <View className="w-24 h-24 rounded-full border-2 border-green-600 justify-center items-center">
                                <Ionicons name="person-outline" size={48} color="#509b43" />
                            </View>
                        </View>
                        <View className="flex-1 justify-center">
                            <Text className="text-lg font-bold text-gray-800 mb-3 text-center">Vui lòng đăng nhập</Text>
                            <TouchableOpacity
                                className="bg-green-600 p-3 rounded-lg justify-center items-center"
                                onPress={() => {
                                    navigation.navigate("Auth", { screen: "Login" });
                                }}
                            >
                                <Text className="text-lg font-medium text-white">Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default AccountTab;
