import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
// import { introspect } from "../../services/AuthAPIService";
import { getToken } from "../../utils/authStorage";

import logo from "../../assets/img/logo.png";

const Intro = ({ navigation }) => {
    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token) {
                // const data = await introspect(token);
                // if (data.success) {
                //     navigation.replace("Home");
                //     return;
                // }
            }
            navigation.replace("Starter");
        };

        const timer = setTimeout(() => {
            checkToken();
        }, 1200);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 20,
    },
});

export default Intro;
