import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Alert, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";

import Carousel from "../../components/Carousel";
import JobCard from "../../components/JobCard";
import SearchBar from "../../components/SearchBar";
import LoginPrompt from "../../components/LoginPrompt";
import OverlayLoading from "../../components/loaders/OverlayLoading";

import { getToken } from "../../utils/authStorage";
import { getAllJobPosts, getPopularJobPosts } from "../../services/jobPostService";

const ITEMS_PER_PAGE = 5;

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [listBestJobs, setListBestJobs] = useState([]);
    const [listJobs, setListJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Tách riêng logic fetch token
    const fetchToken = useCallback(async () => {
        const savedToken = await getToken();
        setToken(savedToken);
    }, []);

    // Tách riêng logic fetch best jobs
    const fetchBestJobs = useCallback(async () => {
        try {
            const data = await getPopularJobPosts();
            if (data.success) {
                setListBestJobs(data.result);
            } else {
                Alert.alert("Lỗi", data.message);
            }
        } catch (error) {
            console.error("Fetch best jobs error:", error);
            Alert.alert("Lỗi", "Không thể tải việc làm nổi bật");
        }
    }, []);

    // Tối ưu lại loadData
    const loadData = useCallback(async (newPage = 1, isRefresh = false) => {
        try {
            if (newPage === 1 && !isRefresh) {
                setLoading(true);
            }

            const data = await getAllJobPosts(newPage, ITEMS_PER_PAGE);

            if (data.success) {
                if (newPage === 1) {
                    setListJobs(data.result);
                } else {
                    setListJobs((prev) => [...prev, ...data.result]);
                }

                setHasMoreData(data.result.length === ITEMS_PER_PAGE);
            } else {
                Alert.alert("Lỗi", data.message);
            }
        } catch (error) {
            console.error("Load data error:", error);
            Alert.alert("Lỗi", "Không thể tải danh sách việc làm");
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
            setIsRefreshing(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchBestJobs();
    }, [fetchBestJobs]);

    // Focus effect
    useFocusEffect(
        useCallback(() => {
            fetchToken();
            setPage(1);
            loadData(1);
        }, [fetchToken, loadData])
    );

    // Refresh handler
    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setPage(1);
        loadData(1, true);
        fetchBestJobs();
    }, [loadData, fetchBestJobs]);

    // Load more handler
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

    // Render methods
    const renderJobItem = useCallback(
        ({ item }) => <JobCard job={item} onPress={() => navigation.navigate("JobDetail", { job: item })} />,
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

            <View className="mt-10" />
            <SearchBar onSubmit={(query) => navigation.navigate("JobList", { searchQuery: query })} />

            {token === null && <LoginPrompt />}

            <Text className="text-lg font-bold text-gray-800 mb-2 ml-5">Việc làm được quan tâm nhất</Text>

            <Carousel data={listBestJobs} renderItem={renderJobItem} />

            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-gray-800 ml-5">Việc làm mới nhất</Text>
                <TouchableOpacity onPress={() => navigation.navigate("JobList")}>
                    <Text className="text-green-600 font-bold text-base mr-5">Xem tất cả</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-1 px-5">
                <FlatList
                    data={listJobs}
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
        </View>
    );
};

export default Home;
