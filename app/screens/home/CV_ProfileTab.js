import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cvFolder from "../../assets/img/cvFolder.jpg";

const CV_ProfileTabv = ({ route, navigation }) => {
    return (
        <View className="flex-1 bg-white ">
            <Text className="text-lg font-bold text-gray-800 m-5">CV đã tải lên Job Portal</Text>
            <View className="items-center">
                <View className="bg-white rounded-xl px-5 py-7 items-center w-11/12" style={styles.shadowStyle}>
                    <Image source={cvFolder} className="w-28 h-28" />

                    <Text className="text-base font-bold text-gray-800 text-center">Chưa có CV nào được tải lên</Text>

                    <Text className="text-base text-gray-600 text-center mt-2 mb-5">
                        Tải lên CV có sẵn trong thiết bị để tiếp cận với nhà tuyển dụng
                    </Text>

                    <TouchableOpacity
                        className="flex-row bg-green-600 rounded-lg py-3 px-5 items-center"
                        onPress={() => navigation.navigate("CV", { screen: "UploadCV" })}
                    >
                        <Ionicons name="cloud-upload-outline" size={24} color="#fff" className="mr-2" />
                        <Text className="text-white font-bold text-base">Tải CV ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
});

export default CV_ProfileTabv;
