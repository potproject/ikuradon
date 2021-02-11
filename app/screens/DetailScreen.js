import React, { useState } from "react";
import { Platform, Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { ThemeContext, Header } from "react-native-elements";
import MastoRow from "../components/MastoRow";
import { hide as HideAction, deleting as DeleteAction } from "../actions/actioncreators/main";
import { boost as BoostAction, favourite as FavouriteAction, bookmark as BookmarkAction } from "../actions/actioncreators/mastorow";
import { open as openImageViewerAction, close as closeImageViewerAction } from "../actions/actioncreators/imageviewer";
import { closeDetail } from "../actions/actioncreators/detail";
import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";

import NavigationService from "../services/NavigationService";
import { useDispatch, useSelector } from "react-redux";

const reducerSelector =  state => ({
    current: state.currentUserReducer,
    detail: state.detailReducer
});

function DetailScreen({ route, navigation }) {
    const dispatch = useDispatch();
    const { current, detail } = useSelector(reducerSelector);
    const { data, loaded } = detail;
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={true} onPress={() => {
                    dispatch(closeDetail());
                    navigation.goBack();
                }} />}
                centerComponent={<TimelineCenterHeader fixedTitle={false} onPress={navigation.openDrawer} current={current}/>}   
            />
            { (loaded === null || loaded === false) &&
                <ActivityIndicator  style={styles.loader} size="large" />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000"
    },
    loader: {
        marginTop: 20,
        marginBottom: 20
    }
});

export default DetailScreen;
