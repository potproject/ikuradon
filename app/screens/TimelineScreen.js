import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import MastoList from "../components/MastoList";
import TootButton from "../components/TootButton";
import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";
import TimelineStreamingButton from "../components/TimelineStreamingButton";
import t from "../services/I18n";

import { Header, ThemeContext } from "react-native-elements";

const CurrentUserReducerSelector = state => state.currentUserReducer;

import * as RouterName from "../constants/RouterName";

function TimelineScreen({ route, navigation }) {
    const type = dataSelector(route.name);
    const isBack = isBackName(route.name);
    const isStream = isStreamName(route.name);
    const current = useSelector(CurrentUserReducerSelector);
    useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={isBack} goBack={navigation.goBack} openDrawer={navigation.openDrawer} />}
                centerComponent={<TimelineCenterHeader fixedTitle={getFixedTitle(route.name)} onPress={navigation.openDrawer} current={current}/>}
                rightComponent={isStream ? <TimelineStreamingButton type={type}/>: null}
            />
            <MastoList type={type}/>
            <View style={styles.tootButton}>
                <TootButton />
            </View>
        </View>
    );
}

function getFixedTitle(name){
    switch (name) {
        case RouterName.Favourites:
            return t("favourited_title");
        case RouterName.Bookmarks:
            return t("bookmarks_title");
        default:
            return "";
    }
}
function isStreamName(name){
    switch (name) {
        case RouterName.Timeline_Home:
        case RouterName.Timeline_Local:
        case RouterName.Timeline_Federal:
            return true;
        default:
            return false;
    }
}

function isBackName(name){
    switch (name) {
        case RouterName.Timeline_Home:
        case RouterName.Timeline_Local:
        case RouterName.Timeline_Federal:
        case RouterName.Timeline_Notifications:
            return false;
        case RouterName.Favourites:
        case RouterName.Bookmarks:
            return true;
        default:
            return true;
    }
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
        case RouterName.Favourites:
            return "favourites";
        case RouterName.Bookmarks:
            return "bookmarks";
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


export default TimelineScreen;