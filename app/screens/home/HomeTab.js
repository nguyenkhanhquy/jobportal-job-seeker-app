import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Alert, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";

import Carousel from "../../components/Carousel";
import JobCard from "../../components/JobCard";
import SearchBar from "../../components/SearchBar";
import LoginPrompt from "../../components/LoginPrompt";

import { getListJobs } from "../../services/jobAPIService";
import { getToken } from "../../utils/authStorage";

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [listBestJobs, setListBestJobs] = useState([]);
    const [listJobs, setListJobs] = useState([]);
    const [page, setPage] = useState(1); // Theo dõi trang hiện tại
    const [isFetchingMore, setIsFetchingMore] = useState(false); // Theo dõi quá trình tải thêm dữ liệu
    const [hasMoreData, setHasMoreData] = useState(true); // Theo dõi nếu còn dữ liệu để tải

    // Lấy token một lần khi component được render
    useEffect(() => {
        const fetchToken = async () => {
            const savedToken = await getToken();
            setToken(savedToken);
        };

        const fetchBestJobs = async () => {
            try {
                const data = await getListJobs(1, 10);
                if (data.success) {
                    setListBestJobs(data.result);
                } else {
                    Alert.alert("Lỗi", data.message);
                }
            } catch (error) {
                Alert.alert("Lỗi", "Tải dữ liệu thất bại.");
            }
        };

        fetchToken();
        fetchBestJobs();
    }, []);

    const loadData = useCallback(async (newPage = 1) => {
        try {
            if (newPage === 1) setLoading(true);
            const data = await getListJobs(newPage, 5); // Tải 5 công việc mỗi trang
            if (data.success) {
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
                Alert.alert("Lỗi", data.message);
            }
        } catch (error) {
            Alert.alert("Lỗi", "Tải dữ liệu thất bại.");
        } finally {
            setLoading(false);
            setIsFetchingMore(false); // Dừng tải thêm dữ liệu
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

            <View className="mt-10" />
            <SearchBar />

            {token === null && <LoginPrompt />}

            <Text className="text-lg font-bold text-gray-800 mb-2 ml-5">Việc làm được quan tâm nhất</Text>
            <Carousel data={listBestJobs} renderItem={renderJobItem} />

            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-gray-800 ml-5">Việc làm mới nhất</Text>
                <TouchableOpacity onPress={() => navigation.navigate("JobList")}>
                    <Text className="text-green-600 font-bold text-base mr-5">Xem tất cả</Text>
                </TouchableOpacity>
            </View>

            {/* <Carousel data={listJobs} renderItem={renderJobItem} horizontal={false} /> */}
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
};

export default Home;
