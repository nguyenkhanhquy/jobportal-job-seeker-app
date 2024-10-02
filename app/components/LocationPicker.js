import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View } from "react-native";

const LocationPicker = ({ selectedLocation, setSelectedLocation }) => {
    return (
        <View className="mx-5 my-2">
            <View className="border border-green-600 rounded-xl overflow-hidden">
                <Picker
                    selectedValue={selectedLocation}
                    onValueChange={(itemValue) => setSelectedLocation(itemValue)}
                    className="h-12 w-full bg-gray-100 px-2 text-gray-800"
                    dropdownIconColor="#00A86B"
                >
                    <Picker.Item label="Tất cả khu vực" value="all" />
                    <Picker.Item label="Hà Nội" value="Hà Nội" />
                    <Picker.Item label="Hồ Chí Minh" value="Hồ Chí Minh" />
                    <Picker.Item label="Đà Nẵng" value="Đà Nẵng" />
                </Picker>
            </View>
        </View>
    );
};

export default LocationPicker;
