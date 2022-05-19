import React, { useEffect } from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import Constants from "expo-constants";
import { withTheme } from "react-native-elements";

import { appInit } from "../actions/actioncreators/appinit";

function AppInitScreen({ updateTheme, navigation }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appInit(updateTheme));
    }, []);
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/image/icon250.png")} />
            <View>
                <Text style={styles.text}>Loading...</Text>
                <Text style={styles.text}>Version: { Constants.manifest.version }</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF3300"
    },
    text: {
        color: "#FFFFFF"
    },
    logo: {
        width: 100,
        height: 100,
    },
});


export default withTheme(AppInitScreen);