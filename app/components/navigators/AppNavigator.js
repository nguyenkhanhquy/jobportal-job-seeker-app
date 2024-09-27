import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Toast from "react-native-toast-message";

import Intro from "../../screens/intro/intro";
import Starter from "../../screens/starter/starter";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

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
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

export default AppNavigator;