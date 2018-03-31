import React from "react";
import { TabNavigator } from "react-navigation";

import HomeTabScreen from "../components/maintab/home";
import LocalTabScreen from "../components/maintab/local";
import FederalTabScreen from "../components/maintab/federal";
import NotificationsTabScreen from "../components/maintab/notifications";
import SettingTabScreen from "../components/maintab/setting";

import StreamingButton from "./maintab/streamingbutton";
import TootButton from "./maintab/tootbutton";

import { FontAwesome } from "@expo/vector-icons";
import I18n from "../i18n";


export default TabNavigator(
    {
        Home: {
            screen: HomeTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_home"),
                headerLeft:<StreamingButton type={"home"} />,
                headerRight: <TootButton />,
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="home" size={32} color={tintColor} />
                )
            }),
        },
        Local: {
            screen: LocalTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_local"),
                //headerLeft:<StreamingButton type={"local"} />, //not working bug.
                headerRight: <TootButton />,
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="users" size={26} color={tintColor} />
                )
            }),
        },
        federal: {
            screen: FederalTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_federal"),
                //headerLeft:<StreamingButton type={"federal"} />, //not working bug.
                headerRight: <TootButton />,
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="globe" size={32} color={tintColor} />
                )
            }),
        },
        notifications: {
            screen: NotificationsTabScreen,
            navigationOptions: () => ({
                title: I18n.t("navigation_notifications"),
                headerRight: <TootButton />,
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