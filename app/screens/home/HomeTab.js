import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Alert, View, Text, TouchableOpacity } from "react-native";
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
            const data = await getListJobs(1, 10);
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
        <View className="flex-1 bg-white">
            <StatusBar style="auto" />

            <SearchBar />

            <Text className="text-lg font-bold text-gray-800 mb-2 ml-5">Việc làm tốt nhất</Text>
            <Carousel data={listJobs} renderItem={renderJobItem} />

            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-gray-800 ml-5">Việc làm mới nhất</Text>
                <TouchableOpacity>
                    <Text className="text-green-600 font-bold text-base mr-5">Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <Carousel data={listJobs} renderItem={renderJobItem} horizontal={false} />
        </View>
    );
};

export default Home;
