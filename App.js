import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Intro from "./app/screens/intro/intro";

export default function App() {
    return (
        <>
            <Intro />
            <StatusBar style="auto" />
        </>
    );
}
