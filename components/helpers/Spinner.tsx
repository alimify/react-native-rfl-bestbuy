import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";


const Spinner = props => {

    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#FBA939" />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#d4d5d6'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default Spinner;
