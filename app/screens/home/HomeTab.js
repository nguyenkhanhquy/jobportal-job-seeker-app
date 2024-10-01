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
        <View style={styles.container}>
            <StatusBar style="auto" />

            <SearchBar />

            <Text style={styles.sectionTitle} className="text-lg font-bold text-gray-800 mb-2">
                Việc làm tốt nhất
            </Text>
            <Carousel data={listJobs} renderItem={renderJobItem} />

            <View style={styles.listContainer}>
                <View className="flex-row justify-between items-center mb-2">
                    <Text style={styles.sectionTitle} className="text-lg font-bold text-gray-800">
                        Việc làm mới nhất
                    </Text>
                    <TouchableOpacity>
                        <Text className="text-green-600 font-bold text-base">Xem tất cả</Text>
                    </TouchableOpacity>
                </View>

                <Carousel data={listJobs} renderItem={renderJobItem} horizontal={false} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        paddingHorizontal: 20,
    },
    listContainer: {
        marginBottom: 20,
    },
});

export default Home;
