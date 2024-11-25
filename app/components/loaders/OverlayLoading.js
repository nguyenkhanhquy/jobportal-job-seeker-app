import { ActivityIndicator, View } from "react-native";

const OverlayLoading = () => {
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Làm mờ phần nền xung quanh một chút
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
            }}
        >
            {/* Hình vuông chứa ActivityIndicator */}
            <View
                style={{
                    width: 68, // Kích thước của hình vuông
                    height: 68,
                    backgroundColor: "#fff", // Màu nền trắng cho hình vuông
                    borderRadius: 10, // Bo góc cho hình vuông
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5, // Hiệu ứng đổ bóng cho Android
                }}
            >
                <ActivityIndicator size="large" color="#16a34a" />
            </View>
        </View>
    );
};
export default OverlayLoading;
