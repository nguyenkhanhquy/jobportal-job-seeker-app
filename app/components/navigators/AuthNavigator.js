import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/auth/login";
import Register from "../../screens/auth/register";
import ForgotPassWord from "../../screens/auth/forgotPassword";
import ResetPassword from "../../screens/auth/resetPassword";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
                name="ForgotPassWord"
                component={ForgotPassWord}
                options={{ headerShown: true, headerTitle: "" }}
            />
            <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{ headerShown: true, headerTitle: "" }}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
