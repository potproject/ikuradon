import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import NotificationsList from "../components/NotificationsList";
import TootButton from "../components/TootButton";
import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";

import { Header, ThemeContext } from "react-native-elements";

const CurrentUserReducerSelector = state => state.currentUserReducer;

import * as RouterName from "../constants/RouterName";

function NotificationsScreen({ navigation }) {
    const type = "notifications";
    const current = useSelector(CurrentUserReducerSelector);
    useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={false} onPress={navigation.openDrawer} />}
                centerComponent={<TimelineCenterHeader fixedTitle={""} onPress={navigation.openDrawer} current={current}/>}
                rightComponent={null}
            />
            <NotificationsList type={type}/>
            <View style={styles.tootButton}>
                <TootButton onPress={() => navigation.navigate(RouterName.Toot)}/>
            </View>
        </View>
    );
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

export default NotificationsScreen;