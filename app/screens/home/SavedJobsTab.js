import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, View, Text, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import EmptyCard from "../../components/card/EmptyCard";
import SavedJobCard from "../../components/card/SavedJobsCard";
import LoginPrompt from "../../components/LoginPrompt";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import OverLoading from "../../components/loaders/OverlayLoading";

import { getToken } from "../../utils/authStorage";

import { getJobPostById } from "../../services/jobPostService";
import { getAllJobSaved, deleteAllJobSaved } from "../../services/jobSavedService";

const SavedJobsTab = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [flag, setFlag] = useState(false);
    const [ConfirmDialogVisible, setConfirmDialogVisible] = useState(false); // Trạng thái hiển thị ConfirmDialog

    const [listJobs, setListJobs] = useState([]);
    const [totalElements, setTotalElements] = useState(0); // Tổng số công việc đã lưu

    const [page, setPage] = useState(1); // Theo dõi trang hiện tại
    const [isFetchingMore, setIsFetchingMore] = useState(false); // Theo dõi quá trình tải thêm dữ liệu
    const [hasMoreData, setHasMoreData] = useState(false); // Theo dõi nếu còn dữ liệu để tải

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "bottom",
            bottomOffset: 80,
            visibilityTime: 3000,
            text1Style: { fontSize: 16, fontWeight: "bold" },
            text2Style: { fontSize: 12 },
        });
    };

    useEffect(() => {
        setPage(1);
        setHasMoreData(true);
        loadData(1);
    }, [flag]);

    const loadData = useCallback(async (newPage = 1) => {
        const token = await getToken();
        if (token) {
            setToken(token);
            try {
                if (newPage === 1) setLoading(true);
                const data = await getAllJobSaved(newPage, 6);
                if (data.success) {
                    setTotalElements(data.pageInfo.totalElements);
                    if (newPage > 1) {
                        // Thêm các công việc mới
                        setListJobs((prevJobs) => [...prevJobs, ...data.result]);
                    } else {
                        // Tải trang đầu tiên của danh sách công việc
                        setListJobs(data.result);
                    }
                    // Kiểm tra xem còn dữ liệu để tải hay không
                    if (data.result.length === 0) {
                        setHasMoreData(false);
                    }
                } else {
                    showToast("error", data.message || "Tải dữ liệu thất bại.");
                }
            } catch (error) {
                showToast("error", error?.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            } finally {
                setLoading(false);
                setIsFetchingMore(false); // Dừng tải thêm dữ liệu
            }
        } else {
            setToken(null);
        }
    }, []);

    // Tải dữ liệu ban đầu khi component được focus
    useFocusEffect(
        useCallback(() => {
            setPage(1);
            setHasMoreData(true);
            loadData(1);
        }, [loadData])
    );

    const handleDeleteAll = async () => {
        // Hàm xử lý khi xác nhận xóa tất cả
        try {
            await deleteAllJobSaved();
            setListJobs([]); // Xóa toàn bộ danh sách
            setTotalElements(0); // Đặt lại tổng số công việc đã lưu
            showToast("success", "Đã xóa tất cả công việc đã lưu");
        } catch (error) {
            showToast("error", error?.message || "Lỗi máy chủ, vui lòng thử lại sau!");
        } finally {
            setConfirmDialogVisible(false); // Đóng ConfirmDialog
        }
    };

    // Xử lý lazy loading (tải thêm dữ liệu khi kéo tới cuối danh sách)
    const handleLoadMore = () => {
        if (!isFetchingMore && hasMoreData) {
            setIsFetchingMore(true);
            setPage((prevPage) => {
                const newPage = prevPage + 1;
                loadData(newPage);
                return newPage;
            });
        }
    };

    const handleViewDetail = async (jobPostId) => {
        const data = await getJobPostById(jobPostId);
        navigation.navigate("JobDetail", { job: data.result });
    };

    const renderJobItem = ({ item }) => (
        <SavedJobCard job={item} setFlag={setFlag} onPress={() => handleViewDetail(item.id)} />
    );

    const renderFooter = () => {
        if (!isFetchingMore) return null;
        return <ActivityIndicator size="large" color="#16a34a" />;
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="auto" />

            {loading && <OverLoading />}

            {token === null ? (
                <LoginPrompt />
            ) : (
                <>
                    <View className="flex-row justify-between items-center my-2">
                        <Text className="text-lg font-bold text-gray-800 ml-5">{totalElements} Việc đã lưu </Text>
                        <TouchableOpacity onPress={() => setConfirmDialogVisible(true)}>
                            <Text className="text-green-600 font-bold text-base mr-5">Xóa tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-1 px-5">
                        {listJobs.length === 0 ? (
                            <EmptyCard />
                        ) : (
                            <FlatList
                                data={listJobs}
                                renderItem={renderJobItem}
                                keyExtractor={(item) => item.id.toString()}
                                vertical={true}
                                onEndReached={handleLoadMore}
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={renderFooter}
                            />
                        )}
                    </View>

                    <ConfirmDialog
                        visible={ConfirmDialogVisible}
                        title="Bạn có chắc muốn xóa tất cả việc làm đã lưu?"
                        onConfirm={handleDeleteAll}
                        onCancel={() => setConfirmDialogVisible(false)}
                    />
                </>
            )}
        </View>
    );
};

export default SavedJobsTab;
