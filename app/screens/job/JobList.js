import React, { useState, useCallback, useEffect } from "react";
import { ActivityIndicator, View, Alert, FlatList, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import SortPicker from "../../components/SortPicker";
import JobCard from "../../components/JobCard";
import EmptyCard from "../../components/card/EmptyCard";

import { getAllJobPosts } from "../../services/jobPostService";

export default function JobList({ route, navigation }) {
    const searchQuery = route.params?.searchQuery;

    const [loading, setLoading] = useState(true);
    const [listJobs, setListJobs] = useState([]);
    const [selectedSort, setSelectedSort] = useState(null);
    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [query, setQuery] = useState(searchQuery || "");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery || "");

    // Xử lý debounce cho tìm kiếm
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 600); // Đợi 600ms sau khi người dùng ngừng gõ

        return () => clearTimeout(timeoutId);
    }, [query]);

    // Xử lý khi debounced query thay đổi
    useEffect(() => {
        if (debouncedQuery !== searchQuery) {
            setPage(1);
            loadData(1);
        }
    }, [debouncedQuery, selectedSort]);

    const loadData = useCallback(
        async (newPage = 1) => {
            try {
                if (newPage === 1) {
                    setLoading(true);
                    setHasMoreData(true); // Reset hasMoreData khi tìm kiếm mới
                }

                const data = await getAllJobPosts(newPage, 6, debouncedQuery.trim(), selectedSort);

                if (data.success) {
                    if (newPage === 1) {
                        setListJobs(data.result);
                    } else {
                        setListJobs((prevJobs) => [...prevJobs, ...data.result]);
                    }

                    setHasMoreData(data.result.length === 6); // Nếu nhận ít hơn 6 kết quả, không còn data
                } else {
                    Alert.alert("Lỗi", data.message);
                }
            } catch (error) {
                console.error("Load data error:", error);
                Alert.alert("Lỗi", "Tải dữ liệu thất bại.");
            } finally {
                setLoading(false);
                setIsFetchingMore(false);
            }
        },
        [debouncedQuery, selectedSort]
    );

    useFocusEffect(
        useCallback(() => {
            setPage(1);
            loadData(1);
        }, [loadData])
    );

    const handleLoadMore = () => {
        if (!isFetchingMore && hasMoreData && !loading) {
            setIsFetchingMore(true);
            setPage((prevPage) => {
                const newPage = prevPage + 1;
                loadData(newPage);
                return newPage;
            });
        }
    };

    const renderJobItem = ({ item }) => (
        <JobCard job={item} onPress={() => navigation.navigate("JobDetail", { job: item })} />
    );

    const renderFooter = () => {
        if (!isFetchingMore) return null;
        return (
            <View className="py-4">
                <ActivityIndicator size="large" color="#16a34a" />
            </View>
        );
    };

    const renderEmpty = () => {
        if (loading) return null;
        return <EmptyCard />;
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="auto" />

            <View className="flex-row items-center bg-gray-100 rounded-lg py-3 px-4 mx-5 shadow-sm">
                <Ionicons name="search" size={24} color="#888" className="mr-3" />
                <TextInput
                    className="flex-1 text-base text-gray-700"
                    placeholder="Tìm kiếm công việc"
                    value={query}
                    onChangeText={setQuery}
                    returnKeyType="search"
                />
            </View>

            <SortPicker
                selectedSort={selectedSort}
                setSelectedSort={(value) => {
                    setSelectedSort(value);
                    setPage(1);
                }}
            />

            <View className="flex-1 px-5">
                {loading && page === 1 ? (
                    <ActivityIndicator size="large" color="#16a34a" />
                ) : (
                    <FlatList
                        data={listJobs}
                        renderItem={renderJobItem}
                        keyExtractor={(item) => item.id.toString()}
                        vertical={true}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={renderEmpty}
                        refreshing={loading && page === 1}
                        onRefresh={() => {
                            setPage(1);
                            loadData(1);
                        }}
                    />
                )}
            </View>
        </View>
    );
}
