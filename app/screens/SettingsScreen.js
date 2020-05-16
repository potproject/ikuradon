import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Switch } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { ListItem, ThemeContext } from "react-native-elements";
import t from "../services/I18n";

import { setInvisibleTimeline, allClear } from "../actions/actioncreators/config";
import { logout } from "../actions/actioncreators/login";

const reducerSelector =  state => ({
    current: state.currentUserReducer,
    config: state.configReducer
});

function SettingsScreen() {
    const dispatch = useDispatch();
    const { current, config } = useSelector(reducerSelector);
    const { invisible } = config;
    const { user_credentials, domain } = current;
    const { theme } = useContext(ThemeContext);
    const invisibleCheck = (value) => {
        let count = 0;
        invisible.home && count++;
        invisible.local && count++;
        invisible.federal && count++;
        invisible.notifications && count++;
        // 全部非表示は無理やで
        if(count >= 3 && value === true){
            console.log("invisible validate fail");
            return false;
        }
        return true;
    };
    return (
        <View style={styles.container}>
            <Text style={[{color: theme.colors.grey0},styles.label]}>{user_credentials ? user_credentials.username + "@" + domain : ""}</Text>
            <ListItem
                title={t("logout")}
                bottomDivider
                chevron
                onPress={()=>dispatch(logout())}
            />
            <Text style={[{color: theme.colors.grey0},styles.label]}>{t("setting_header_visible")}</Text>
            <ListItem
                title={t("setting_visible_home")}
                bottomDivider
                switch={{value: invisible.home, onValueChange: value => invisibleCheck(value) && dispatch(setInvisibleTimeline("home", value))}}
            />
            <ListItem
                title={t("setting_visible_local")}
                bottomDivider
                switch={{value: invisible.local, onValueChange: value => invisibleCheck(value) && dispatch(setInvisibleTimeline("local", value))}}
            />
            <ListItem
                title={t("setting_visible_federal")}
                bottomDivider
                switch={{value: invisible.federal, onValueChange: value => invisibleCheck(value) && dispatch(setInvisibleTimeline("federal", value))}}
            />
            <ListItem
                title={t("setting_visible_notifications")}
                bottomDivider
                switch={{value: invisible.notifications, onValueChange: value => invisibleCheck(value) && dispatch(setInvisibleTimeline("notifications", value))}}
            />
            <Text style={[{color: theme.colors.grey0},styles.label]}>{}</Text>
            <ListItem
                title={t("setting_allclear")}
                bottomDivider
                chevron
                onPress={()=>dispatch(allClear())}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 10,
    }
});

export default SettingsScreen;
