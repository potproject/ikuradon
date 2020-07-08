import React, { useState, useContext } from "react";
import { Platform, Text, StyleSheet, View } from "react-native";
import { ThemeContext, Header } from "react-native-elements";
import MastoRow from "../components/MastoRow";
import { hide as HideAction, deleting as DeleteAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction, bookmark as BookmarkAction } from "../actions/actioncreators/mastorow";
import { open as openImageViewerAction, close as closeImageViewerAction } from "../actions/actioncreators/imageviewer";

import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";

import NavigationService from "../services/NavigationService";
import { useDispatch, useSelector } from "react-redux";

const CurrentUserReducerSelector = state => state.currentUserReducer;

function DetailScreen({ route, navigation }) {
    let item = route.params;
    const dispatch = useDispatch();
    const current = useSelector(CurrentUserReducerSelector);
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={true} onPress={navigation.goBack} />}
                centerComponent={<TimelineCenterHeader fixedTitle={false} onPress={navigation.openDrawer} current={current}/>}   
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
        color: "#8899a6",
    }
});

export default DetailScreen;
