import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import NotificationsList from "../components/NotificationsList";
import TootButton from "../components/TootButton";
import TimelineLeftHeader from "../components/TimelineLeftHeader";
import TimelineCenterHeader from "../components/TimelineCenterHeader";

import { Header, ThemeContext } from "react-native-elements";

const CurrentUserReducerSelector = state => state.currentUserReducer;

function NotificationsScreen({ navigation }) {
    const type = "notifications";
    const current = useSelector(CurrentUserReducerSelector);
    useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Header
                leftComponent={<TimelineLeftHeader isBack={false} goBack={null} openDrawer={navigation.openDrawer} />}
                centerComponent={<TimelineCenterHeader fixedTitle={""} onPress={navigation.openDrawer} current={current}/>}
                rightComponent={null}
            />
            <NotificationsList type={type}/>
            <View style={styles.tootButton}>
                <TootButton />
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