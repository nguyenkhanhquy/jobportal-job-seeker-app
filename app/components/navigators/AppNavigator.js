import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Toast from "react-native-toast-message";

import Intro from "../../screens/intro/intro";
import Starter from "../../screens/starter/starter";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

import ActivateAccount from "../../screens/account/activateAccount";
import Profile from "../../screens/account/profile";
import ChangePassword from "../../screens/account/changePassword";
import JobDetail from "../../screens/job/JobDetail";
import JobApplicationScreen from "../../screens/job/JobApplicationScreen/JobApplicationScreen";
import JobList from "../../screens/job/JobList";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Intro"
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Starter" component={Starter} />
                <Stack.Screen name="Auth" component={AuthNavigator} />
                <Stack.Screen name="Home" component={MainTabNavigator} />

                <Stack.Screen name="ActivateAccount" component={ActivateAccount} />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: true, headerTitle: "Thông tin cá nhân", headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{ headerShown: true, headerTitle: "Đổi mật khẩu", headerTitleAlign: "center" }}
                />
                <Stack.Screen name="JobDetail" component={JobDetail} />
                <Stack.Screen
                    name="JobApplication"
                    component={JobApplicationScreen}
                    options={{
                        headerShown: true,
                        headerTitle: "Ứng tuyển",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "#ffffff", borderColor: "#f0f0f0", borderBottomWidth: 1 },
                        headerTintColor: "#000",
                    }}
                />
                <Stack.Screen
                    name="JobList"
                    component={JobList}
                    options={{ headerShown: true, headerTitle: "Danh sách việc làm" }}
                />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

export default AppNavigator;
