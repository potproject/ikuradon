import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

import { useDispatch } from "react-redux";

function MainScreen() {
    return (
        <View style={styles.container}>
        </View>
    );
}

MainScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width: 100,
        height: 100,
    },
});


export default MainScreen;