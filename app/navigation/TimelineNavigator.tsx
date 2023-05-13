import React, { useContext } from "react";
import TimelineScreen from "../screens/TimelineScreen";
import NotificationsScreen from "../screens/NotificationsScreen";

import ItemTabBar from "../components/ItemTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "react-native-elements";
import { useSelector } from "react-redux";

const MainReducerSelector = (state: RootState) => state.mainReducer;
const reducerSelector = (state: RootState) => ({ 
    current: state.currentUserReducer,
    streaming: state.streamingReducer,
    config: state.configReducer
});

import t from "../services/I18n";
import * as RouterName from "../constants/RouterName";
import { RootState } from "../reducers";

const Tab = createBottomTabNavigator();

export default function TimelineNavigator() {
    const { home, local, federal, notifications } = useSelector(MainReducerSelector);
    const { theme } = useContext(ThemeContext);
    const { current, streaming, config } = useSelector(reducerSelector);
    const { invisible } = config;
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: theme.colors.primary,
            inactiveTintColor: theme.colors.grey2,
            activeBackgroundColor : theme.customColors.charBackground,
            inactiveBackgroundColor: theme.customColors.charBackground,
            style: { backgroundColor: theme.customColors.charBackground }
        }}>
            { !invisible.home &&
            <Tab.Screen name={RouterName.Timeline_Home} component={TimelineScreen} 
                options={{ 
                    tabBarLabel: t("navigation_home"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"home"} badgeCount={home.newArrival} streamBadge={streaming.home} color={color} size={26} />),
                }}
            />
            }
            { !invisible.local &&
            <Tab.Screen name={RouterName.Timeline_Local} component={TimelineScreen} 
                options={{
                    tabBarLabel: current.sns === "bluesky" ? t("bluesky.navigation_local"): t("navigation_local"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"users"} badgeCount={local.newArrival} streamBadge={streaming.local} color={color} size={22} />),
                }} 
            />
            }
            { !invisible.federal &&
            <Tab.Screen name={RouterName.Timeline_Federal} component={TimelineScreen} 
                options={{
                    tabBarLabel: current.sns === "bluesky" ? t("bluesky.navigation_federal"): t("navigation_federal"),
                    tabBarIcon: ({ color }) => (<ItemTabBar type={"federal"} name={"globe"} badgeCount={federal.newArrival} streamBadge={streaming.federal} color={color} size={26} />),
                }} 
            />
            }
            { !invisible.notifications &&
            <Tab.Screen name={RouterName.Timeline_Notifications} component={NotificationsScreen} 
                options={{
                    tabBarLabel: t("navigation_notifications"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"bell"} badgeCount={notifications.newArrival} color={color} size={24} />),
                }} 
            />
            }
        </Tab.Navigator>
    );
}
