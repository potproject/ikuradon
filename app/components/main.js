import React from "react";
import { Button, StyleSheet } from "react-native";
import { TabNavigator } from "react-navigation";

import HomeTabScreen from "../components/maintab/home";
import LocalTabScreen from "../components/maintab/local";
import FederalTabScreen from "../components/maintab/federal";
import NotificationsTabScreen from "../components/maintab/notifications";
import SettingTabScreen from "../components/maintab/setting";

import { FontAwesome } from "@expo/vector-icons";
import I18n from "../i18n";

export default TabNavigator(
    {
        Home: {
            screen: HomeTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_home"),
                headerRight: <Button title={I18n.t("navigation_button_toot")} onPress={() => this.headerRightHandler()} />,
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="home" size={32} color={tintColor} />
                )
            }),
        },
        Local: {
            screen: LocalTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_local"),
                headerRight: <Button title={I18n.t("navigation_button_toot")} onPress={() => this.headerRightHandler()} />,
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="users" size={26} color={tintColor} />
                )
            }),
        },
        federal: {
            screen: FederalTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_federal"),
                headerRight: <Button title={I18n.t("navigation_button_toot")} onPress={() => this.headerRightHandler()} />,
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="globe" size={32} color={tintColor} />
                )
            }),
        },
        notifications: {
            screen: NotificationsTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_notifications"),
                headerRight: <Button title={I18n.t("navigation_button_toot")} onPress={() => this.headerRightHandler()} />,
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="bell" size={26} color={tintColor} />
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
    },
    {
        tabBarOptions: {},
    }
);

/*
const styles = StyleSheet.create({
    container: {
    },
});*/