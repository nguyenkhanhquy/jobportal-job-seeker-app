import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, View, Alert, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import LocationPicker from "../../components/LocationPicker";
import SearchBar from "../../components/SearchBar";
import JobCard from "../../components/JobCard";

import { getSearchJobs, getFilterJobs } from "../../services/jobAPIService";
import { getToken } from "../../utils/authStorage";

export default function JobList({ route, navigation }) {
    const searchQuery = route.params?.searchQuery;

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [listJobs, setListJobs] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [page, setPage] = useState(1); // Theo dõi trang hiện tại
    const [isFetchingMore, setIsFetchingMore] = useState(false); // Theo dõi quá trình tải thêm dữ liệu
    const [hasMoreData, setHasMoreData] = useState(true); // Theo dõi nếu còn dữ liệu để tải
    const [query, setQuery] = useState(searchQuery); // State để lưu truy vấn tìm kiếm

    // useEffect(() => {
    //     const fetchToken = async () => {
    //         const savedToken = await getToken();
    //         setToken(savedToken);
    //     };

    //     fetchToken();
    // }, []);

    const loadData = useCallback(
        async (newPage = 1) => {
            try {
                if (newPage === 1) setLoading(true);
                const data = await getFilterJobs(query, selectedLocation, newPage, 5); // Tải công việc theo từ khóa tìm kiếm
                if (data.success) {
                    if (newPage > 1) {
                        setListJobs((prevJobs) => [...prevJobs, ...data.result]);
                    } else {
                        setListJobs(data.result);
                    }
                    // Kiểm tra xem còn dữ liệu để tải hay không
                    if (data.result.length === 0) {
                        setHasMoreData(false);
                    }
                } else {
                    Alert.alert("Lỗi", data.message);
                }
            } catch (error) {
                Alert.alert("Lỗi", "Tải dữ liệu thất bại.");
            } finally {
                setLoading(false);
                setIsFetchingMore(false); // Dừng tải thêm dữ liệu
            }
        },
        [query, selectedLocation]
    );

    useFocusEffect(
        useCallback(() => {
            setPage(1);
            setHasMoreData(true);
            loadData(1); // Đặt lại trang về 1
        }, [loadData])
    );

    // Cập nhật danh sách công việc khi thay đổi truy vấn tìm kiếm
    const handleSearch = (searchQuery) => {
        setQuery(searchQuery); // Cập nhật state truy vấn
        setPage(1); // Đặt lại về trang đầu tiên
        setHasMoreData(true); // Đặt lại cờ có thêm dữ liệu
        loadData(1); // Tải dữ liệu với truy vấn mới
    };

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

    const renderJobItem = ({ item }) => (
        <JobCard job={item} onPress={() => navigation.navigate("JobDetail", { job: item })} />
    );

    const renderFooter = () => {
        if (!isFetchingMore) return null;
        return <ActivityIndicator size="large" color="#16a34a" />;
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="auto" />
            <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
            <LocationPicker selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
            <View className="flex-1 px-5">
                <FlatList
                    data={listJobs}
                    renderItem={renderJobItem}
                    keyExtractor={(item) => item.id.toString()}
                    vertical={true}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            </View>
        </View>
    );
}
