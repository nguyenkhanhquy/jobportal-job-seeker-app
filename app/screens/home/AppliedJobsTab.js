import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppliedJobCard from "../../components/card/AppliedJobCard";
import LoginPrompt from "../../components/LoginPrompt";
import EmptyCard from "../../components/card/EmptyCard";

import { getToken } from "../../utils/authStorage";

const appliedJobs = [
    {
        title: "Frontend Developer",
        jobPosition: "Lập trình viên React",
        companyName: "Công ty A",
        applyDate: "2024-11-23",
        coverLetter: "Tôi là một người đam mê công nghệ, đặc biệt là phát triển giao diện...",
    },
    {
        title: "Backend Developer",
        jobPosition: "Lập trình viên Node.js",
        companyName: "Công ty B",
        applyDate: "2024-11-20",
        coverLetter: "Tôi muốn tham gia để đóng góp vào hệ thống backend của công ty...",
    },
];

const AppliedJobsTab = () => {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    const fetchToken = async () => {
        const savedToken = await getToken();
        setToken(savedToken);
    };

    const handleViewDetail = (job) => {
        // navigation.navigate("JobDetail", { job });
    };

    const handleViewCV = (job) => {
        // console.log("Viewing CV for:", job.title);
    };

    // Tải dữ liệu ban đầu khi component được focus
    useFocusEffect(
        useCallback(() => {
            fetchToken();
            if (token === null) return;
        }, [])
    );

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="auto" />

            {loading && (
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
            )}
            {token === null ? (
                <LoginPrompt />
            ) : appliedJobs.length === 0 ? (
                <EmptyCard />
            ) : (
                <ScrollView className="flex-1 bg-gray-100 p-4">
                    {appliedJobs.map((job, index) => (
                        <AppliedJobCard
                            key={index}
                            job={job}
                            onViewDetail={() => handleViewDetail(job)}
                            onViewCV={() => handleViewCV(job)}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default AppliedJobsTab;
