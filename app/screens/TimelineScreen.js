import * as React from "react";
import { StyleSheet, View } from "react-native";
import MastoList from "../components/MastoList";

import { Header, withTheme } from "react-native-elements";

import * as RouterName from "../constants/RouterName";

function TimelineScreen({ route, navigation }) {
    const type = dataSelector(route.name);
    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: "menu", color: "#fff", onPress: navigation.openDrawer }}
            />
            <MastoList type={type}/>
        </View>
    );
}

function dataSelector(name){
    switch (name) {
        case RouterName.Timeline_Home:
            return "home";
        case RouterName.Timeline_Local:
            return "local";
        case RouterName.Timeline_Federal:
            return "federal";
        case RouterName.Timeline_Notifications:
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


export default withTheme(TimelineScreen);