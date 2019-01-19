import React from "react";
import { connect } from "react-redux";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeTabScreen from "../components/maintab/home";
import LocalTabScreen from "../components/maintab/local";
import FederalTabScreen from "../components/maintab/federal";
import NotificationsTabScreen from "../components/maintab/notifications";
import SettingTabScreen from "../components/maintab/setting";

import { FontAwesome } from "@expo/vector-icons";
import I18n from "../i18n";
import NotificationsIconBadge from "./maintab/notificationsiconbadge";

import StreamingButton from "../components/maintab/streamingbutton";
import TootButton from "../components/maintab/tootbutton";

class Main extends React.Component {
    constructor(props) {
        super(props);
        let tabs = {};

        if (props.ConfigReducer.invisible && !props.ConfigReducer.invisible.home) {
            tabs.home = HomeTabScreen;
        }
        if (props.ConfigReducer.invisible && !props.ConfigReducer.invisible.local) {
            tabs.local = LocalTabScreen;
        }
        if (props.ConfigReducer.invisible && !props.ConfigReducer.invisible.federal) {
            tabs.federal = FederalTabScreen;
        }
        if (props.ConfigReducer.invisible && !props.ConfigReducer.invisible.notifications) {
            tabs.notifications = NotificationsTabScreen;
        }
        tabs.setting = SettingTabScreen;

        const TabNavigator = createBottomTabNavigator(tabs, {
            defaultNavigationOptions: ({ navigation }) => {
                return {
                    title: I18n.t(`navigation_${navigation.state.routeName}`),
                    tabBarIcon: ({ tintColor }) => {
                        const { routeName } = navigation.state;
                        switch (routeName) {
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
                    }
                };
            },
            tabBarOptions: {
                activeTintColor: "#FF6347",
                inactiveTintColor: "gray"
            }
        });
        const MainAppNavigator = createStackNavigator(
            {
                Tab: TabNavigator
            },
            {
                defaultNavigationOptions: ({ navigation }) => {
                    return {
                        headerTitle: I18n.t(`navigation_${navigation.state.routes[navigation.state.index].routeName}`),
                        headerLeft: ["home", "local", "federal"].includes(navigation.state.routes[navigation.state.index].routeName) ? (
                            <StreamingButton type={navigation.state.routes[navigation.state.index].routeName} />
                        ) : null,
                        headerRight: <TootButton />
                    };
                }
            }
        );
        this.Main = createAppContainer(MainAppNavigator);
    }
    render() {
        return <this.Main />;
    }
}

export default connect(state => ({ ConfigReducer: state.configReducer }))(Main);
