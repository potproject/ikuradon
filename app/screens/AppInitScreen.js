import * as React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";

import { appInit } from "../actions/actioncreators/appinit";
const AppInitReducerSelector = state => state.appInitReducer;

function AppInitScreen({ navigation }) {
    const dispatch = useDispatch();
    const appInitReducer = useSelector(AppInitReducerSelector);

    if(!appInitReducer.init){
        dispatch(appInit());
    }
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


export default AppInitScreen;