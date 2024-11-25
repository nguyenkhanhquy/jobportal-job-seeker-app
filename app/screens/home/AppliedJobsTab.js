import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Linking, Alert, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppliedJobCard from "../../components/card/AppliedJobCard";
import LoginPrompt from "../../components/LoginPrompt";
import EmptyCard from "../../components/card/EmptyCard";
import OverLoading from "../../components/loaders/OverlayLoading";

import { getAllJobApplied } from "../../services/jobApplyService";
import { getToken } from "../../utils/authStorage";

const AppliedJobsTab = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    const [appliedJobs, setAppliedJobs] = useState([]);

    const [page, setPage] = useState(1); // Theo dõi trang hiện tại
    const [isFetchingMore, setIsFetchingMore] = useState(false); // Theo dõi quá trình tải thêm dữ liệu
    const [hasMoreData, setHasMoreData] = useState(false); // Theo dõi nếu còn dữ liệu để tải

    const handleViewDetail = (job) => {
        navigation.navigate("JobDetail", { job });
    };

    const handleViewCV = async (job) => {
        console.log("Viewing CV for:", job.cv);
        try {
            const supported = await Linking.canOpenURL(job.cv);

            if (supported) {
                await Linking.openURL(job.cv);
            } else {
                Alert.alert("Lỗi", "Không thể mở file CV");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể mở file CV");
            console.error(error);
        }
    };

    const loadData = useCallback(async (newPage = 1) => {
        const token = await getToken();
        if (token) {
            setToken(token);
            try {
                if (newPage === 1) setLoading(true);
                const data = await getAllJobApplied(newPage, 5);
                if (data.success) {
                    if (newPage > 1) {
                        // Thêm các công việc mới
                        setAppliedJobs((prevJobs) => [...prevJobs, ...data.result]);
                    } else {
                        // Tải trang đầu tiên của danh sách công việc
                        setAppliedJobs(data.result);
                    }
                    // Kiểm tra xem còn dữ liệu để tải hay không
                    if (data.result.length === 0) {
                        setHasMoreData(false);
                    }
                } else {
                    Alert.alert("Lỗi", data.message || "Tải dữ liệu thất bại.");
                }
            } catch (error) {
                Alert.alert("Lỗi", "Tải dữ liệu thất bại.");
            } finally {
                setLoading(false);
                setIsFetchingMore(false); // Dừng tải thêm dữ liệu
            }
        }
    }, []);

    // Tải dữ liệu ban đầu khi component được focus
    useFocusEffect(
        useCallback(() => {
            // Đặt lại phân trang khi quay lại màn hình
            setPage(1);
            setHasMoreData(true);
            loadData(1); // Đặt lại trang về 1
        }, [loadData])
    );

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="auto" />

            {loading && <OverLoading />}
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
