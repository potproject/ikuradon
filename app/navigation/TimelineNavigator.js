import * as React from "react";
import TimelineScreen from "../screens/TimelineScreen";
import NotificationsScreen from "../screens/NotificationsScreen";

import ItemTabBar from "../components/ItemTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

const MainReducerSelector = state => state.mainReducer;
const StreamingReducerSelector = state => state.streamingReducer;

import t from "../services/I18n";
import * as RouterName from "../constants/RouterName";

const Tab = createBottomTabNavigator();

export default function TimelineNavigator() {
    const { home, local, federal, notifications } = useSelector(MainReducerSelector);
    const streaming = useSelector(StreamingReducerSelector);
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: "#FF3300",
        }}>
            <Tab.Screen name={RouterName.Timeline_Home} component={TimelineScreen} 
                options={{ 
                    tabBarLabel: t("navigation_home"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"home"} badgeCount={home.newArrival} streamBadge={streaming.home} color={color} size={26} />),
                }}
            />
            <Tab.Screen name={RouterName.Timeline_Local} component={TimelineScreen} 
                options={{
                    tabBarLabel: t("navigation_local"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"users"} badgeCount={local.newArrival} streamBadge={streaming.local} color={color} size={22} />),
                }} 
            />
            <Tab.Screen name={RouterName.Timeline_Federal} component={TimelineScreen} 
                options={{
                    tabBarLabel: t("navigation_federal"),
                    tabBarIcon: ({ color }) => (<ItemTabBar type={"federal"} name={"globe"} badgeCount={federal.newArrival} streamBadge={streaming.federal} color={color} size={26} />),
                }} 
            />
            <Tab.Screen name={RouterName.Timeline_Notifications} component={NotificationsScreen} 
                options={{
                    tabBarLabel: t("navigation_notifications"),
                    tabBarIcon: ({ color }) => (<ItemTabBar name={"bell"} badgeCount={notifications.newArrival} color={color} size={24} />),
                }} 
            />
        </Tab.Navigator>
    );
}
