import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View } from "react-native";

const SortPicker = ({ selectedSort, setSelectedSort }) => {
    return (
        <View className="mx-5 my-2">
            <View className="border border-green-600 rounded-xl overflow-hidden">
                <Picker
                    selectedValue={selectedSort}
                    onValueChange={(itemValue) => setSelectedSort(itemValue)}
                    className="h-12 w-full bg-gray-100 px-2 text-gray-800"
                    dropdownIconColor="#00A86B"
                >
                    <Picker.Item label="Mặc định" value="default" />
                    <Picker.Item label="Việc làm mới nhất" value="latest" />
                    <Picker.Item label="Việc làm cũ nhất" value="oldest" />
                    <Picker.Item label="Cập nhật gần nhất" value="recentUpdate" />
                </Picker>
            </View>
        </View>
    );
};

export default SortPicker;
