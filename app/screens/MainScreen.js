import * as React from "react";
import { StyleSheet, View } from "react-native";
import MastoList from "../components/MastoList";

import * as RouterName from "../constants/RouterName";

function MainScreen({route}) {
    const type = dataSelector(route.name);
    return (
        <View style={styles.container}>
            <MastoList type={type}/>
        </View>
    );
}

function dataSelector(name){
    switch (name) {
        case RouterName.Main_Home:
            return "home";
        case RouterName.Main_Local:
            return "local";
        case RouterName.Main_Federal:
            return "federal";
        case RouterName.Main_Notifications:
            return "notifications";
        default:
            return "home";
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


export default MainScreen;