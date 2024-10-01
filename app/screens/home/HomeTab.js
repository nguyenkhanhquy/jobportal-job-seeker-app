import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, ScrollView, Alert, View, Text, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import Carousel from "../../components/Carousel";
import JobCard from "../../components/JobCard";
import SearchBar from "../../components/SearchBar";

import { getListJobs } from "../../services/jobAPIService";

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [listJobs, setListJobs] = useState([]);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getListJobs();
            if (data.success) {
                setListJobs(data.result);
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to load data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const renderJobItem = ({ item }) => (
        <JobCard job={item} onPress={() => navigation.navigate("JobDetail", { job: item })} />
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SearchBar />
            <ScrollView style={styles.scrollView}>
                {/* Phần "Việc làm tốt nhất" */}
                <Text className="text-lg font-bold text-gray-800 mb-2">Việc làm tốt nhất</Text>
                <Carousel data={listJobs} renderItem={renderJobItem} />

                {/* Phần "Việc làm hấp dẫn" */}
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-lg font-bold text-gray-800">Việc làm hấp dẫn</Text>
                    <TouchableOpacity>
                        <Text className="text-green-600 font-bold text-base">Xem tất cả</Text>
                    </TouchableOpacity>
                </View>

                {/* FlatList chỉ cho phần "Việc làm hấp dẫn" */}
                <View style={styles.listContainer}>
                    <FlatList
                        data={listJobs}
                        renderItem={renderJobItem}
                        keyExtractor={(item) => item.id.toString()}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                {/* Các Text để kiểm tra cuộn */}
                <Text className="text-lg font-bold text-gray-800 mb-2">Abc Abc</Text>
                <Text className="text-lg font-bold text-gray-800 mb-2">Abc Abc</Text>
                <Text className="text-lg font-bold text-gray-800 mb-2">Abc Abc</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    listContainer: {
        height: 400,
    },
});

export default Home;
