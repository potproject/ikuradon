import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import HomeTabScreen from "../components/maintab/home";
import LocalTabScreen from "../components/maintab/local";
import FederalTabScreen from "../components/maintab/federal";
import NotificationsTabScreen from "../components/maintab/notifications";
import SettingTabScreen from "../components/maintab/setting";

import StreamingButton from "./maintab/streamingbutton";
import TootButton from "./maintab/tootbutton";

import { FontAwesome } from "@expo/vector-icons";
import I18n from "../i18n";
import NotificationsIconBadge from "./maintab/notificationsiconbadge";

const TabNavigator = createBottomTabNavigator(
    {
        home: {
            screen: HomeTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_home"),
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="home" size={32} color={tintColor} />
                )
            }),
        },
        local: {
            screen: LocalTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_local"),
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="users" size={26} color={tintColor} />
                )
            }),
        },
        federal: {
            screen: FederalTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_federal"),
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="globe" size={32} color={tintColor} />
                )
            }),
        },
        notifications: {
            screen: NotificationsTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_notifications"),
                tabBarIcon: ({ tintColor }) => (
                    <NotificationsIconBadge color={tintColor} count={0} />
                )
            }),
        },
        setting: {
            screen: SettingTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_setting"),
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="cogs" size={26} color={tintColor} />
                )
            }),
        }
    }
);

TabNavigator.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let headerTitle = I18n.t(`navigation_${routeName}`);
    let headerLeft = routeName === "home" ? <StreamingButton type={routeName} /> : null;
    let headerRight = <TootButton />;
    return {
        headerTitle,
        headerLeft,
        headerRight,
    };
};

export default TabNavigator;
/*
const styles = StyleSheet.create({
    container: {
    },
});*/