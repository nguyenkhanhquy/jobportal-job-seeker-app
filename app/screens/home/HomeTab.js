import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, ScrollView, Alert, View, Text, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import Carousel from "../../components/Carousel";
import JobCard from "../../components/JobCard";

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
        <ScrollView style={styles.container}>
            <StatusBar style="auto" />

            <View className="flex-row justify-between items-center px-4 mb-2">
                <Text className="text-lg font-bold text-gray-800">Việc làm tốt nhất</Text>
                <TouchableOpacity onPress={() => navigation.navigate("JobList")}>
                    <Text className="text-green-600 font-bold text-base">Xem tất cả</Text>
                </TouchableOpacity>
            </View>

            <Carousel data={listJobs} renderItem={renderJobItem} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default Home;
