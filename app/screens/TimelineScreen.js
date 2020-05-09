import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MastoList from "../components/MastoList";
import TimelineCenterHeader from "../components/TimelineCenterHeader";

import { Header, Icon, withTheme } from "react-native-elements";

const CurrentUserReducerSelector = state => state.currentUserReducer;


import * as RouterName from "../constants/RouterName";
import TootButton from "../components/TootButton";

function TimelineScreen({ route, navigation }) {
    const type = dataSelector(route.name);
    const current = useSelector(CurrentUserReducerSelector);
    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: "menu", color: "#fff", onPress: navigation.openDrawer }}
                centerComponent={<TimelineCenterHeader onPress={navigation.openDrawer} current={current}/>}
            />
            <MastoList type={type}/>
            <View style={styles.tootButton}>
                <TootButton />
            </View>
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
    },
    tootButton: {
        position: "absolute",
        bottom: 5,
        right: 5,
    }
});


export default withTheme(TimelineScreen);