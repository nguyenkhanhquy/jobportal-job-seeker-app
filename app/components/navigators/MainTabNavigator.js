import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import HomeTab from "../../screens/home/HomeTab";
import AppliedJobsTab from "../../screens/home/AppliedJobsTab";
import SavedJobsTab from "../../screens/home/SavedJobsTab";
import NotificationTab from "../../screens/home/NotificationTab";
import AccountTab from "../../screens/home/AccountTab";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "HomeTab":
                            iconName = focused ? "home" : "home-outline";
                            break;
                        case "AppliedJobsTab":
                            iconName = focused ? "reader" : "reader-outline";
                            break;
                        case "SavedJobsTab":
                            iconName = focused ? "bookmark" : "bookmark-outline";
                            break;
                        case "NotificationScreen":
                            iconName = focused ? "notifications" : "notifications-outline";
                            break;
                        case "AccountTab":
                            iconName = focused ? "person" : "person-outline";
                            break;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#16a34a",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="HomeTab" component={HomeTab} options={{ tabBarLabel: "Trang chủ" }} />
            <Tab.Screen
                name="AppliedJobsTab"
                component={AppliedJobsTab}
                options={{
                    tabBarLabel: "Đã ứng tuyển",
                    headerShown: true,
                    headerTitle: "Việc làm đã ứng tuyển",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "#ffffff", borderColor: "#f0f0f0", borderBottomWidth: 1 },
                    headerTintColor: "#000",
                }}
            />
            <Tab.Screen
                name="SavedJobsTab"
                component={SavedJobsTab}
                options={{
                    tabBarLabel: "Đã lưu",
                    headerShown: true,
                    headerTitle: "Việc làm đã lưu",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "#ffffff", borderColor: "#f0f0f0", borderBottomWidth: 1 },
                    headerTintColor: "#000",
                }}
            />
            {/* <Tab.Screen name="NotificationScreen" component={NotificationTab} options={{ tabBarLabel: "Thông Báo" }} /> */}
            <Tab.Screen name="AccountTab" component={AccountTab} options={{ tabBarLabel: "Tài Khoản" }} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
