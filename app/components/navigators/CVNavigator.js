import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UploadCV from "../../screens/CV/uploadCV";

const Stack = createStackNavigator();

const CVNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UploadCV"
                component={UploadCV}
                options={{ headerShown: true, headerTitle: "Tải CV lên", headerTitleAlign: "center" }}
            />
        </Stack.Navigator>
    );
};

export default CVNavigator;
