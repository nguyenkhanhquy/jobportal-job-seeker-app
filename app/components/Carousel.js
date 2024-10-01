import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

const Carousel = ({ data, renderItem, horizontal = true }) => {
    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={horizontal}
                showsVerticalScrollIndicator={!horizontal}
                // snapToInterval={360}
                // snapToAlignment="start"
                // decelerationRate="fast"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        paddingHorizontal: 20,
    },
});

export default Carousel;
