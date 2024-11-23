import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const ConfirmDialog = ({ visible, title, onConfirm, onCancel }) => {
    if (!visible) return null;

    return (
        <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onCancel}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <View className="w-[80%] bg-white rounded-lg p-5 shadow-lg">
                    <Text className="text-lg font-bold text-gray-800  mb-10">{title}</Text>
                    <View className="flex-row justify-end space-x-4">
                        <TouchableOpacity className="bg-green-600 px-5 py-2 rounded-lg " onPress={onConfirm}>
                            <Text className="text-white font-medium text-base">Xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-gray-300 px-5 py-2 rounded-lg" onPress={onCancel}>
                            <Text className="text-gray-800 font-medium text-base">Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmDialog;
