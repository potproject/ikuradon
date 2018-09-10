import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import HomeTabScreen from "../components/maintab/home";
import LocalTabScreen from "../components/maintab/local";
import FederalTabScreen from "../components/maintab/federal";
import NotificationsTabScreen from "../components/maintab/notifications";
import SettingTabScreen from "../components/maintab/setting";

import { FontAwesome } from "@expo/vector-icons";
import I18n from "../i18n";
import NotificationsIconBadge from "./maintab/notificationsiconbadge";

const TabNavigator = createBottomTabNavigator(
    {
        home: HomeTabScreen,
        local: LocalTabScreen,
        federal: FederalTabScreen,
        notifications: NotificationsTabScreen,
        setting: SettingTabScreen
    },
    {
        navigationOptions: ({ navigation }) => 
        {
            return {
                title: I18n.t(`navigation_${navigation.state.routeName}`),
                tabBarIcon: ({ tintColor }) => {
                    const { routeName } = navigation.state;
                    switch (routeName){
                        case "home":
                            return <FontAwesome name="home" size={32} color={tintColor} />;
                        case "local":
                            return <FontAwesome name="users" size={26} color={tintColor} />;
                        case "federal":
                            return <FontAwesome name="globe" size={32} color={tintColor} />;
                        case "notifications":
                            return <NotificationsIconBadge color={tintColor} count={0} />;
                        case "setting":
                            return <FontAwesome name="cogs" size={26} color={tintColor} />;
                    }
                },
            };
        },
        tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
        },
    }
);

export default TabNavigator;