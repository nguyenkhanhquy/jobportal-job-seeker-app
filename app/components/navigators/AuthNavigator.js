import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/auth/login";
import Register from "../../screens/auth/register";
// import ForgotPassWordPage from "../../screens/auth/ForgotPasswordPage";
// import ResetPassWordPage from "../../screens/auth/ResetPassWordPage";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            {/* <Stack.Screen
                name="ForgotPassWord"
                component={ForgotPassWordPage}
                options={{ headerShown: true, headerTitle: "" }}
            />
            <Stack.Screen
                name="ResetPassWord"
                component={ResetPassWordPage}
                options={{ headerShown: true, headerTitle: "" }}
            /> */}
        </Stack.Navigator>
    );
};

export default AuthNavigator;
