import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, Linking, Alert, View, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AppliedJobCard from "../../components/card/AppliedJobCard";
import LoginPrompt from "../../components/LoginPrompt";
import EmptyCard from "../../components/card/EmptyCard";
import OverlayLoading from "../../components/loaders/OverlayLoading";

import { getJobPostById } from "../../services/jobPostService";
import { getAllJobApplied } from "../../services/jobApplyService";
import { getToken } from "../../utils/authStorage";

const ITEMS_PER_PAGE = 5;

const AppliedJobsTab = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    // Xử lý debounce cho tìm kiếm
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 600); // Đợi 600ms sau khi người dùng ngừng gõ

        return () => clearTimeout(timeoutId);
    }, [query]);

    // Xử lý khi debounced query thay đổi
    useEffect(() => {
        if (debouncedQuery !== query) {
            setPage(1);
            loadData(1);
        }
    }, [debouncedQuery]);

    const loadData = useCallback(async (newPage = 1, isRefresh = false) => {
        const token = await getToken();
        if (token) {
            setToken(token);
            try {
                if (newPage === 1 && !isRefresh) {
                    setLoading(true);
                }

                const data = await getAllJobApplied(newPage, ITEMS_PER_PAGE);

                if (data.success) {
                    if (newPage === 1) {
                        setAppliedJobs(data.result);
                    } else {
                        setAppliedJobs((prev) => [...prev, ...data.result]);
                    }

                    setHasMoreData(data.result.length === ITEMS_PER_PAGE);
                } else {
                    Alert.alert("Lỗi", data.message);
                }
            } catch (error) {
                console.error("Load data error:", error);
                Alert.alert("Lỗi", "Không thể tải danh sách công việc đã ứng tuyển");
            } finally {
                setLoading(false);
                setIsFetchingMore(false);
                setIsRefreshing(false);
            }
        } else {
            setToken(null);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            setPage(1);
            loadData(1);
        }, [loadData])
    );

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setPage(1);
        loadData(1, true);
    }, [loadData]);

    const handleLoadMore = useCallback(() => {
        if (!isFetchingMore && hasMoreData && !loading) {
            setIsFetchingMore(true);
            setPage((prev) => {
                const newPage = prev + 1;
                loadData(newPage);
                return newPage;
            });
        }
    }, [isFetchingMore, hasMoreData, loading, loadData]);

    const handleViewDetail = async (jobPostId) => {
        const data = await getJobPostById(jobPostId);
        navigation.navigate("JobDetail", { job: data.result });
    };

    const handleViewCV = async (cv) => {
        // job.jobPostId
        try {
            const supported = await Linking.canOpenURL(cv);

            if (supported) {
                await Linking.openURL(cv);
            } else {
                Alert.alert("Lỗi", "Không thể mở file CV");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể mở file CV");
            console.error(error);
        }
    };

    const renderJobItem = useCallback(
        ({ item }) => (
            <AppliedJobCard
                job={item}
                onViewDetail={() => handleViewDetail(item.jobPostId)}
                onViewCV={() => handleViewCV(item.cv)}
            />
        ),
        [navigation]
    );

    const renderFooter = useCallback(() => {
        if (!isFetchingMore) return null;
        return (
            <View className="py-2">
                <ActivityIndicator size="large" color="#16a34a" />
            </View>
        );
    }, [isFetchingMore]);

    const renderLoader = useCallback(() => <OverlayLoading />, []);

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="auto" />

            {loading && renderLoader()}
            {token === null ? (
                <LoginPrompt />
            ) : appliedJobs.length === 0 ? (
                <EmptyCard />
            ) : (
                <>
                    <View className="flex-row items-center bg-gray-100 rounded-lg py-3 px-5 my-5 mx-5 shadow-sm">
                        <Ionicons name="search" size={24} color="#888" className="mr-3" />
                        <TextInput
                            className="flex-1 text-base text-gray-700"
                            placeholder="Tìm kiếm công việc đã ứng tuyển"
                            // value={query}
                            // onChangeText={setQuery}
                            // returnKeyType="search"
                        />
                    </View>

                    <View className="flex-1 px-5">
                        <FlatList
                            data={appliedJobs}
                            renderItem={renderJobItem}
                            keyExtractor={(item) => item.id.toString()}
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={renderFooter}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={5}
                            windowSize={10}
                        />
                    </View>
                </>
            )}
        </View>
    );
};

export default AppliedJobsTab;
