import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import * as RouterName from "../constants/RouterName";

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
            <Button
                title="Go to Details"
                onPress={() => {navigation.navigate(RouterName.Login)}}
            />
        </View>
    );
}

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


export default AppInitScreen;