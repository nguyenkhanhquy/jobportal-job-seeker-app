import React from "react";
import { View, Text } from "react-native";
import { Svg, G, Ellipse, Path } from "react-native-svg";

const EmptyCard = () => {
    return (
        <View className="flex-1 flex-col justify-center items-center p-4">
            <Svg width="100" height="100" viewBox="0 0 64 41" fill="none" className="opacity-80">
                <G transform="translate(0 1)" fill="none" fillRule="evenodd">
                    {/* Ellipse bóng dưới thùng */}
                    <Ellipse cx="32" cy="33" rx="32" ry="7" fill="#E0E0E0" />
                    <G fillRule="nonzero" fill="#D9D9D9">
                        {/* Hình thùng phía trên */}
                        <Path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
                        {/* Hình thùng phía dưới */}
                        <Path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            fill="#F5F5F5"
                        />
                    </G>
                </G>
            </Svg>
            <Text className="text-lg text-gray-500 font-medium mt-4">Trống</Text>
        </View>
    );
};

export default EmptyCard;
